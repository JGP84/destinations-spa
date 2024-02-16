import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'destinations-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  destinations: Destin[] = [];
  private subscription!: Subscription;

  constructor(@Inject(DestinationService) private destinationService: DestinationService, private router: Router ) {}

  ngOnInit() {
    this.subscription = this.destinationService.getSearchResults().subscribe(
      (destinations: Destin[]) => {
        this.destinations = destinations;
      }
    );
  }

  goNewDestination() {
    this.router.navigate(['/new']);
  }

  getAllDestinations() {
    this.subscription = this.destinationService.getDestinations().subscribe(
      (destinations: Destin[]) => {
        this.destinations = destinations;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
