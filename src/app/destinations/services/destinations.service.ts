import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Destin } from '../interfaces/destin.interface';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinations: Destin[] = [];
  private destinationsChanged = new BehaviorSubject<Destin[]>(
    this.destinations
  );
  private searchResults: Destin[] = [];
  private searchResultsChanged = new BehaviorSubject<Destin[]>(
    this.searchResults
  );
  private isSearchEmpty = true;

  constructor(private http: HttpClient) {
    this.fetchDestinations();
  }

  fetchDestinations(): void {
    this.http
      .get<{ destinations: Destin[] }>('/assets/mock/db.json')
      .pipe(
        map((response) => response.destinations),
        catchError((error) => {
          console.error('Error fetching destinations:', error);
          return [];
        })
      )
      .subscribe((destinations) => {
        this.destinations = destinations;
        this.destinationsChanged.next(this.destinations);
        this.searchResults = destinations;
        this.searchResultsChanged.next(this.searchResults);
      });
  }

  getDestinations(): BehaviorSubject<Destin[]> {
    return this.destinationsChanged;
  }

  getSearchResults(): BehaviorSubject<Destin[]> {
    return this.searchResultsChanged;
  }

  deleteDestination(id: string): void {
    this.destinations = this.destinations.filter(
      (destination) => destination.id !== id
    );
    this.destinationsChanged.next(this.destinations);

    // If the search term is empty, update searchResults to reflect the current state of destinations
    if (this.isSearchEmpty) {
      this.searchResults = [...this.destinations];
    } else {
      this.searchResults = this.searchResults.filter(
        (destination) => destination.id !== id
      );
    }

    this.searchResultsChanged.next(this.searchResults);
  }

  addDestination(newDestination: Destin): void {
    this.destinations.push(newDestination);
    this.destinationsChanged.next(this.destinations);

    // Update searchResults to reflect the current state of destinations
    this.searchResults = [...this.destinations];
    this.searchResultsChanged.next(this.searchResults);
  }

  searchDestinations(name: string): void {
    this.isSearchEmpty = !name;
    if (name) {
      this.searchResults = this.destinations.filter((destination) =>
        destination.name.toLowerCase().includes(name.toLowerCase())
      );
    } else {
      this.searchResults = [...this.destinations];
    }
    this.searchResultsChanged.next(this.searchResults);
  }

  updateDestination(updatedDestination: Destin): void {
    const index = this.destinations.findIndex(
      (destination) => destination.id === updatedDestination.id
    );
    if (index !== -1) {
      this.destinations[index] = updatedDestination;
      this.destinationsChanged.next(this.destinations);
      const searchIndex = this.searchResults.findIndex(
        (destination) => destination.id === updatedDestination.id
      );
      if (searchIndex !== -1) {
        this.searchResults[searchIndex] = updatedDestination;
        this.searchResultsChanged.next(this.searchResults);
      }
    }
  }
}
