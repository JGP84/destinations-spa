import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'info-destin',
  templateUrl: 'info-destin.component.html',
  styleUrls: ['info-destin.component.css']
})
export class InfoDestinComponent implements OnInit {
  constructor(private destinationService: DestinationService,
    private router: Router ) {}





  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home']);
  }
}
