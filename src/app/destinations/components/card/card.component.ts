import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'destinations-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})
export class CardComponent {
  @Input() destination!: Destin;

  constructor( private router: Router ) {}

  goInfoDestination(destination: Destin) {
    this.router.navigate(['home/info/', destination.id]);
  }

  goEditDestination(destination: Destin) {
    this.router.navigate(['home/edit/', destination.id]);
  }
}
