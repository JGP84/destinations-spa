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
  let fetchCalled: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DestinationService],
    });

    service = TestBed.inject(DestinationService);
    httpMock = TestBed.inject(HttpTestingController);
    fetchCalled = false;
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
  ];

  it('should fetch destinations', async () => {
    service.fetchDestinations().subscribe((destinations) => {
      expect(destinations.length).toBe(3); // Expect 3 destinations
      expect(destinations).toEqual(mockDestinations);
      expect(fetchCalled).toBe(false);
      fetchCalled = true;
    });

    const requests = httpMock.match('/assets/mock/db.json');
    expect(requests.length).toBe(2); // Assert that there are two requests
    requests.forEach((req) => req.flush({ destinations: mockDestinations }));

    httpMock.verify(); // Ensure there are no outstanding requests
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

    // Simulate the update in the test data
    const index = mockDestinations.findIndex(
      (d) => d.id === updatedDestination.id
    );
    mockDestinations[index] = updatedDestination;

    // Expect a GET request to fetch destinations and provide a mock response
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
      name: 'Italy',
      capital: 'Rome',
      country_code: 'IT',
      id: 'des_IT',
      description:
        'Italy, a European country with a long Mediterranean coastline, has left a powerful mark on Western culture and cuisine. Its capital, Rome, is home to the Vatican as well as landmark art and ancient ruins.',
      src_img: 'assets/img/destinations/des_IT.jpg',
    };

    await service.addDestination(newDestination);

    // Simulate the addition in the test data
    mockDestinations.push(newDestination);

    // Expect a GET request to fetch destinations and provide a mock response
    const req = httpMock.expectOne('/assets/mock/db.json');
    req.flush({ destinations: mockDestinations });

    service.getDestinations().subscribe((destinations) => {
      const destination = destinations.find((d) => d.id === newDestination.id);
      expect(destination).toEqual(newDestination);
    });
  });
});
