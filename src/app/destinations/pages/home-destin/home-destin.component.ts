import { Component } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'app-home-destin',
  templateUrl: './home-destin.component.html',
  styleUrls: ['./home-destin.component.css']
})
export class HomeDestinComponent {
  public destinations: Destin[] = [];

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe(destinations => this.destinations = destinations);
  }

  goNewDestination() {
    /* this.router.navigate(['/new']); */
  }

  reset() {
    this.destinationService.resetDestinationsOriginal();
  }
}
