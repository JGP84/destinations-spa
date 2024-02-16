import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service'; // Replace 'path/to/your-service' with the actual path to your service
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'new-destin',
  templateUrl: 'new-destin.component.html',
  styleUrls: ['new-destin.component.css'],
})
export class NewDestinComponent implements OnInit {
  constructor(private destinationService: DestinationService) {}

  ngOnInit() {

  }

  destinExample: Destin = {
    name: 'example name',
    capital: 'Example Destination',
    country_code: 'Example Location',
    id: 'sds',
    description: 'Example Description',
    src_img: '',
  };

  addDestination() {
    // Call the addDestination method from your service
    this.destinationService.addDestination(this.destinExample);

    console.log('New destination added:', this.destinExample);
    console.log('All destinations:', this.destinationService.getDestinations());
  }
}
