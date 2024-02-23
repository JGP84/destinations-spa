import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, BehaviorSubject, Observable, tap } from 'rxjs';
import { Destin } from '../interfaces/destin.interface';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private originDestinations: Destin[] = [];

  private destinations = new BehaviorSubject<Destin[]>([]);

  private searchDestinations: Destin[] = [];

  constructor(private http: HttpClient) {
    this.fetchDestinations().subscribe(
      (destinations) => {
        this.originDestinations = [...destinations];
        this.destinations.next(destinations);
        this.searchDestinations = [...destinations];
      },
      (error) => {
        // Handle error here
        console.error('Error fetching destinations:', error);
      }
    );
  }

  fetchDestinations(): Observable<Destin[]> {
    return this.http
      .get<{ destinations: Destin[] }>('./assets/mock/db.json')
      .pipe(
        map((response) => response.destinations || []), // Ensure response.destinations is always an array
        catchError((error) => {
          // Handle error here
          console.error('Error fetching destinations:', error);
          return of([]);
        })
      );
  }

  getDestinations(): Observable<Destin[]> {
    return this.destinations.asObservable();
  }

  getDestinationById(id: string): Destin | undefined {
    return this.destinations.value.find(
      (destination) => destination.id === id
    );
  }

  resetDestinationsOriginal(): void {
    this.destinations.next(this.originDestinations);
    this.searchDestinations = [...this.originDestinations];
  }

  deleteDestination(id: string): void {
    const updatedDestinations = this.destinations.value.filter(
      (destination: Destin) => destination.id !== id
    );

    this.destinations.next(updatedDestinations);

    const updatedSearchDestinations = this.searchDestinations.filter(
      (destination: Destin) => destination.id !== id
    );

    this.searchDestinations = updatedSearchDestinations;
  }

  addDestination(newDestination: Destin): void {
    this.destinations.next([
      newDestination,
      ...this.destinations.value,
    ]);

    this.searchDestinations = [newDestination, ...this.searchDestinations];
  }

  searchDestination(event: Event): void {
    const inputSearch = (event.target as HTMLInputElement).value.toLowerCase();

    const filteredDestinations = this.searchDestinations.filter(
      ({ name, id }: Destin) => {
        return (
          name.toLowerCase().includes(inputSearch) ||
          id.toLowerCase().includes(inputSearch)
        );
      }
    );

    this.destinations.next(filteredDestinations);
  }

  updateDestination(updatedDestination: Destin): void {
    const indexDestinations = this.destinations.value.findIndex(
      (destination) => destination.id === updatedDestination.id
    );
    const indexSearch = this.searchDestinations.findIndex(
      (destination) => destination.id === updatedDestination.id
    );

    if (indexDestinations !== -1) {
      const updatedDestinations = [...this.destinations.value];
      updatedDestinations[indexDestinations] = updatedDestination;
      this.destinations.next(updatedDestinations);
    }

    if (indexSearch !== -1) {
      const updatedSearchDestinations = [...this.searchDestinations];
      updatedSearchDestinations[indexSearch] = updatedDestination;
      this.searchDestinations = updatedSearchDestinations;
    }
  }
}
