import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, BehaviorSubject, Observable, tap } from 'rxjs';
import { Destin } from '../interfaces/destin.interface';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinations: BehaviorSubject<Destin[]> = new BehaviorSubject<Destin[]>([]);
  private destinationsCopy: Destin[] = [];

  constructor(private http: HttpClient) {}

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
          this.destinations.next(destinations);
          this.destinationsCopy = [...destinations];
        })
      );
  }

  getDestinations(): Observable<Destin[]> {
    return this.destinations.asObservable();
  }



  deleteDestination(id: string): void {


  }

  addDestination(newDestination: Destin): void {

  }

  searchDestinations(event: any): void {
    const search = event.target.value.toLowerCase();
    const filteredDestinations = this.destinationsCopy.filter(({ name, id }) => {
      return name.toLowerCase().includes(search) || id.toLowerCase().includes(search);
    });
    this.destinations.next(filteredDestinations);
  }




  /* updateDestination(updatedDestination: Destin): void {

  } */
}
