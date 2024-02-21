import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Destin } from '../../interfaces/destin.interface';
import { DestinationService } from '../../services/destinations.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';




@Component({
  selector: 'destinations-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})
export class CardComponent {
  @Input() destination!: Destin;
  @Output() onGoInfo = new EventEmitter<Destin>();
  @Output() onGoEdit = new EventEmitter<Destin>();


  constructor(private router: Router, private destinationService: DestinationService, private dialog: MatDialog) {}

  goInfoDestination(destination: Destin) {
    this.onGoInfo.emit(destination);
  }

  goEditDestination(destination: Destin) {
    this.onGoEdit.emit(destination);
  }


  deleteDestination(destination: Destin) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: `This action will delete the following destination: ${destination.name}. Do you wish to continue?`,
        labelButton: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.destinationService.deleteDestination(destination.id);
      }
    });
  }
}
