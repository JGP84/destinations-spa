import { Component, OnInit, Input } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'destinations-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() destination!: Destin;

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {}

  deleteDestination(destination: Destin): void {
    this.destinationService.deleteDestination(destination.id);
  }
}
