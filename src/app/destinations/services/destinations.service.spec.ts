import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DestinationService } from './destinations.service';
import { Destin } from '../interfaces/destin.interface';
import { share, catchError } from 'rxjs/operators';
import { lastValueFrom, of } from 'rxjs';

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

  it('should be created', async () => {
    expect(service).toBeTruthy();
    const req = httpMock.expectOne('/assets/mock/db.json');
    expect(req.request.method).toBe('GET');
    await req.flush({ destinations: [] });
  });

  const mockDestinations: Destin[] = [
    {
      name: 'France',
      capital: 'Paris',
      country_code: 'FR',
      id: 'des_FR',
      description:
        "France, located in Western Europe, is known for its art, fashion, culture, and cuisine. It's home to many world-renowned landmarks such as the Eiffel Tower, Louvre Museum, and Palace of Versailles.",
      src_img: 'assets/img/destinations/des_FR.jpg',
    },
    {
      name: 'Spain',
      capital: 'Madrid',
      country_code: 'ES',
      id: 'des_ES',
      description:
        "Spain, a country on Europe's Iberian Peninsula, is famous for its vibrant cities, beautiful beaches, and rich history. It's known for its diverse culture, Flamenco music and dance, bullfights and festivals.",
      src_img: 'assets/img/destinations/des_ES.jpg',
    },
    {
      name: 'Italy',
      capital: 'Rome',
      country_code: 'IT',
      id: 'des_IT',
      description:
        'Italy, a European country with a long Mediterranean coastline, has left a powerful mark on Western culture and cuisine. Its capital, Rome, is home to the Vatican as well as landmark art and ancient ruins.',
      src_img: 'assets/img/destinations/des_IT.jpg',
    },
    {
      name: 'Germany',
      capital: 'Berlin',
      country_code: 'DE',
      id: 'des_DE',
      description:
        'Germany, located in Central Europe, is known for its long and rich history, culture, and science. It is home to many world-renowned landmarks such as the Berlin Wall, Brandenburg Gate, and Neuschwanstein Castle.',
      src_img: 'assets/img/destinations/des_DE.jpg',
    },
    {
      name: 'United Kingdom',
      capital: 'London',
      country_code: 'GB',
      id: 'des_GB',
      description:
        'The United Kingdom, located off the northwestern coast of mainland Europe, is known for its history, culture, and global influence. It is home to many world-renowned landmarks such as the Big Ben, Tower of London, and Stonehenge.',
      src_img: 'assets/img/destinations/des_GB.jpg',
    },
  ];

  it('should fetch destinations', async () => {
    spyOn(service, 'fetchDestinations').and.returnValue(of(mockDestinations));

    service.fetchDestinations().subscribe((destinations) => {
      expect(destinations.length).toBe(5);
      expect(destinations).toEqual(mockDestinations);
    });

    httpMock.expectOne('/assets/mock/db.json').flush(mockDestinations);

    expect(service.fetchDestinations).toHaveBeenCalledTimes(1);
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
      const requests = httpMock.match('/assets/mock/db.json');
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

  it('should delete a destination', async () => {
    const destinationToDelete: Destin = mockDestinations[0];
    await service.deleteDestination(destinationToDelete.id);

    const req = httpMock.expectOne('/assets/mock/db.json');
    req.flush([mockDestinations[1]]);

    service.getDestinations().subscribe((destinations) => {
      expect(destinations).not.toContain(destinationToDelete);
    });
  });

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

    const req = httpMock.expectOne('/assets/mock/db.json');
    req.flush({ destinations: mockDestinations });

    service.getDestinations().subscribe((destinations) => {
      const destination = destinations.find(
        (d) => d.id === updatedDestination.id
      );
      expect(destination).toEqual(updatedDestination);
    });
  });

  it('should get a destination by id', () => {
    const destinationToGet: Destin = mockDestinations[0];
    const req = httpMock.expectOne('/assets/mock/db.json');
    req.flush({ destinations: mockDestinations });

    const destination = service.getDestinationById(destinationToGet.id);
    expect(destination).toEqual(destinationToGet);
  });

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

    const req = httpMock.expectOne('/assets/mock/db.json');
    req.flush({ destinations: mockDestinations });

    service.getDestinations().subscribe((destinations) => {
      const destination = destinations.find((d) => d.id === newDestination.id);
      expect(destination).toEqual(newDestination);
    });
  });
});
