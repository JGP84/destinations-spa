import { Component, OnInit, Input } from '@angular/core';
import { Destination, DestinationService } from '../../services/destinations.service';

@Component({
  selector: 'destinations-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {
  @Input() destination!: Destination;

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {}

  deleteDestination(destination: Destination): void {
   
    this.destinationService.deleteDestination(destination.id);

  }
}
