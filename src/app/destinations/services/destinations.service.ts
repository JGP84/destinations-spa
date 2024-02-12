import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

export interface Destination {
  name: string;
  capital: string;
  country_code: string;
  id: string;
  description: string;
  src_img: string;
}

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinations: Destination[] = [];

  constructor(private http: HttpClient) {}

  fetchDestinations(): Promise<Destination[]> {
    return new Promise((resolve, reject) => {
      this.http.get<{destinations: Destination[]}>('/assets/mock/db.json')
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
          resolve(destinations);
        });
    });
  }

  getDestinations(): Destination[] {
    return this.destinations;
  }
}
