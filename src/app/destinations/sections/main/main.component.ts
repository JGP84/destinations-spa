import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destinations.service';

@Component({
  selector: 'destinations-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  destinations: any[];
  private subscription!: Subscription;

  constructor(@Inject(DestinationService) private destinationService: DestinationService) {
    this.destinations = [];
  }

  async ngOnInit() {
    await this.destinationService.fetchDestinations();
    this.destinations = this.destinationService.getDestinations();

    this.subscription = this.destinationService.destinationsChanged.subscribe(
      (destinations: any[]) => {
        this.destinations = destinations;
      }
    );

  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
