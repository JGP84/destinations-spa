import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DestinationService } from './destinations.service';
import { Destin } from '../interfaces/destin.interface';
import { share, catchError } from 'rxjs/operators';
import { lastValueFrom, of } from 'rxjs';

import data from '../../../assets/mock/db.json';
const mockDestinations: Destin[] = data.destinations;

const MOCK_URL = './assets/mock/db.json';

describe('DestinationService', () => {
  let service: DestinationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DestinationService],
    });

    service = TestBed.inject(DestinationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('fetchDestinations', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();

      const req = httpMock.expectOne(MOCK_URL);
      expect(req.request.method).toBe('GET');
      req.flush({ destinations: [] });
    });

    it('should fetch destinations', () => {
      service.fetchDestinations().subscribe();

      const requests = httpMock.match(MOCK_URL);
      expect(requests.length).toBe(2);

      requests.forEach((req) => {
        expect(req.request.method).toBe('GET');
        req.flush({ destinations: mockDestinations });
      });
    });

    it('should handle fetch destinations error', async () => {
      const requestObservable = service.fetchDestinations().pipe(
        share(),
        catchError((error) => {
          expect(error).toBeTruthy();
          return of([]);
        })
      );

      requestObservable.subscribe((destinations) => {
        expect(destinations.length).toBe(0);
      });

      setTimeout(() => {
        const requests = httpMock.match(MOCK_URL);
        if (requests.length > 0) {
          requests.forEach((req) => {
            req.flush('Simulated network error', {
              status: 500,
              statusText: 'Internal Server Error',
            });
          });
        }
      }, 0);

      await lastValueFrom(requestObservable);
    });
  });

  describe('deleteDestination', () => {
    it('should delete a destination', async () => {
      const destinationToDelete: Destin = mockDestinations[0];
      await service.deleteDestination(destinationToDelete.id);

      const req = httpMock.expectOne(MOCK_URL);
      req.flush([mockDestinations[1]]);

      service.getDestinations().subscribe((destinations) => {
        expect(destinations).not.toContain(destinationToDelete);
      });
    });
  });

  describe('updateDestination', () => {
    it('should update a destination', async () => {
      const updatedDestination: Destin = {
        ...mockDestinations[0],
        name: 'Updated Destination',
      };
      await service.updateDestination(updatedDestination);

      const index = mockDestinations.findIndex(
        (d) => d.id === updatedDestination.id
      );
      mockDestinations[index] = updatedDestination;

      const req = httpMock.expectOne(MOCK_URL);
      req.flush({ destinations: mockDestinations });

      service.getDestinations().subscribe((destinations) => {
        const destination = destinations.find(
          (d) => d.id === updatedDestination.id
        );
        expect(destination).toEqual(updatedDestination);
      });
    });
  });

  describe('getDestinationById', () => {
    it('should get a destination by id', () => {
      const destinationToGet: Destin = mockDestinations[0];
      const req = httpMock.expectOne(MOCK_URL);
      req.flush({ destinations: mockDestinations });

      const destination = service.getDestinationById(destinationToGet.id);
      expect(destination).toEqual(destinationToGet);
    });
  });

  describe('addDestination', () => {
    it('should add a destination', async () => {
      const newDestination: Destin = {
        name: 'New Destination',
        capital: 'New Capital',
        country_code: 'ND',
        id: 'des_ND',
        description: 'New Destination Description',
        src_img: 'assets/img/destinations/des_ND.jpg',
      };

      await service.addDestination(newDestination);

      mockDestinations.push(newDestination);

      const req = httpMock.expectOne(MOCK_URL);
      req.flush({ destinations: mockDestinations });

      service.getDestinations().subscribe((destinations) => {
        const destination = destinations.find(
          (d) => d.id === newDestination.id
        );
        expect(destination).toEqual(newDestination);
      });
    });
  });
});
