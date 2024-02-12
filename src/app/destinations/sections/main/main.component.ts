import { Component, Inject, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';

@Component({
  selector: 'destinations-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  destinations: any[];

  constructor(@Inject(DestinationService) private destinationService: DestinationService) {
    this.destinations = [];
  }

  async ngOnInit() {
    await this.destinationService.fetchDestinations();
    this.destinations = this.destinationService.getDestinations();

    console.log('destinations main', this.destinations);
  }
}
