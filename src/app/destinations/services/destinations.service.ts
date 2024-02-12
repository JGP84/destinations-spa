import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Destin } from '../interfaces/destin.interface';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinations: Destin[] = [];
  destinationsChanged = new Subject<Destin[]>();

  constructor(private http: HttpClient) {}

  fetchDestinations(): Promise<Destin[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<{ destinations: Destin[] }>('/assets/mock/db.json')
        .pipe(
          map((response) => response.destinations),
          catchError((error) => {
            console.error('Error fetching destinations:', error);
            reject(error);
            return [];
          })
        )
        .subscribe((destinations) => {
          console.log('destinations service', destinations);
          this.destinations = destinations;
          this.destinationsChanged.next(this.destinations);
          resolve(destinations);
        });
    });
  }

  getDestinations(): Destin[] {
    return this.destinations;
  }

  deleteDestination(id: string): void {
    this.destinations = this.destinations.filter(
      (destination) => destination.id !== id
    );
    this.destinationsChanged.next(this.destinations);
  }
}
