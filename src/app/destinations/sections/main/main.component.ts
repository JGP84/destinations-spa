import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'destinations-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public destinations: Destin[] = [];


  constructor(private destinationService: DestinationService, private router: Router) {}

  ngOnInit(): void {
    this.destinationService.fetchDestinations().subscribe();
    this.destinationService.getDestinations().subscribe(destinations => this.destinations = destinations);
  }

  goNewDestination() {
    this.router.navigate(['home/new']);
  }

  reset() {
    this.destinationService.resetDestinationsOriginal();
  }
}
