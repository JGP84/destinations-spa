import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Destin } from '../../interfaces/destin.interface';

@Component({
  selector: 'destinations-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})
export class CardComponent {
  @Input() destination!: Destin;
  @Output() onGoInfo = new EventEmitter<Destin>();
  @Output() onGoEdit = new EventEmitter<Destin>();

  constructor(private router: Router) {}

  goInfoDestination(destination: Destin) {
    this.onGoInfo.emit(destination);
  }

  goEditDestination(destination: Destin) {
    this.onGoEdit.emit(destination);
  }
}
