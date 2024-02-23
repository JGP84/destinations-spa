import { Component, ViewChild, ElementRef } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';

@Component({
  selector: 'destinations-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private destinationService: DestinationService) {}

  search(event: Event) {
    this.destinationService.searchDestination(event);
  }

  clearSearch() {
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.dispatchEvent(new Event('input'));
  }
}
