import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'info-destin',
  templateUrl: 'info-destin.component.html',
  styleUrls: ['info-destin.component.css']
})
export class InfoDestinComponent implements OnInit {
  destination: Destin | undefined;

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destination = this.destinationService.getDestinationById(id);
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
