import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'destinations-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public destinations: Destin[] = [];

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.destinationService.fetchDestinations().subscribe();
    this.destinationService.getDestinations().subscribe(destinations => this.destinations = destinations);
  }

  goNewDestination() {
    /* this.router.navigate(['/new']); */
  }
}
