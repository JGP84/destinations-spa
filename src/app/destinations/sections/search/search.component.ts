import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'destinations-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    @Inject(DestinationService) private destinationService: DestinationService
  ) {}

  search(event: any) {
    console.log('searching for:', event.target.value);
    this.destinationService.searchDestinations(event);
  }
}
