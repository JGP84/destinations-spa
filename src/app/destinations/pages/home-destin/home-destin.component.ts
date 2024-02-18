import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-destin',
  templateUrl: './home-destin.component.html',
  styleUrls: ['./home-destin.component.css']
})
export class HomeDestinComponent implements OnInit {


  constructor(private destinationService: DestinationService, private router: Router) {}

  public destinations: Destin[] = [];

  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe(destinations => this.destinations = destinations);
  }

  goNewDestination() {
    this.router.navigate(['home/new']);
  }

  reset() {
    this.destinationService.resetDestinationsOriginal();
  }
}
