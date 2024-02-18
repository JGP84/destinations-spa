import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-destin',
  templateUrl: 'edit-destin.component.html',
  styleUrls: ['edit-destin.component.css']
})
export class EditDestinComponent implements OnInit {
  constructor(private destinationService: DestinationService,
    private router: Router ) {}





  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home']);
  }
}

