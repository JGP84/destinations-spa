import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, BehaviorSubject, Observable, tap } from 'rxjs';
import { Destin } from '../interfaces/destin.interface';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinations: Destin[] = [];

  private destinationsCopy: BehaviorSubject<Destin[]> = new BehaviorSubject<
    Destin[]
  >([]);

  constructor(private http: HttpClient) {
    this.fetchDestinations().subscribe();
  }

  fetchDestinations(): Observable<Destin[]> {
    return this.http
      .get<{ destinations: Destin[] }>('/assets/mock/db.json')
      .pipe(
        map((response) => response.destinations),
        catchError((error) => {
          console.error('Error fetching destinations:', error);
          return of([]);
        }),
        tap((destinations) => {
          this.destinations = [...destinations];
          this.destinationsCopy.next(destinations);
        })
      );
  }

  getDestinations(): Observable<Destin[]> {
    return this.destinationsCopy.asObservable();
  }

  resetDestinationsOriginal(): void {
    this.destinationsCopy.next(this.destinations);
  }

  deleteDestination(id: string): void {
    const updatedDestinations = this.destinationsCopy.value.filter(
      (destination: Destin) => destination.id !== id
    );

    this.destinationsCopy.next(updatedDestinations);
  }

  addDestination(newDestination: Destin): void {
    this.destinationsCopy.next([...this.destinationsCopy.value, newDestination]);
  }

  searchDestinations(event: any): void {
    const search = event.target.value.toLowerCase();

    const filteredDestinations = this.destinations.filter(
      ({ name, id }: Destin) => {
        return (
          name.toLowerCase().includes(search) ||
          id.toLowerCase().includes(search)
        );
      }
    );

    this.destinationsCopy.next(filteredDestinations);
  }

  /* updateDestination(updatedDestination: Destin): void {

  } */
}
