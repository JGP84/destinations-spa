import { Component, Inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'destinations-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  destinations: Destin[] = [];
  private subscription!: Subscription;

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    @Inject(DestinationService) private destinationService: DestinationService
  ) {}

  async ngOnInit() {
    await this.destinationService.fetchDestinations();
    this.subscription = this.destinationService.getSearchResults().subscribe(
      (destinations: Destin[]) => {
        this.destinations = destinations;
      }
    );
  }

  search() {
    const searchTerm = this.searchInput.nativeElement.value;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (searchTerm) {
      this.destinationService.searchDestinations(searchTerm);
    } else {
      this.destinationService.getDestinations();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
