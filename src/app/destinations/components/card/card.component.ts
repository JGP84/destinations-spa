import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'destinations-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() destination!: Destin;

  constructor(
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit() {}

  deleteDestination(destination: Destin): void {
    this.destinationService.deleteDestination(destination.id);
  }

  goInfoDestination(destination: Destin) {
    this.router.navigate(['/info', destination.id]);
  }

  goEditDestination(destination: Destin) {
    this.router.navigate(['/edit', destination.id]);
  }
}
