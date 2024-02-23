import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() onGoInfo: EventEmitter<Destin> = new EventEmitter();
  @Output() onGoEdit: EventEmitter<Destin> = new EventEmitter();

  constructor(
    private destinationService: DestinationService,
    private dialog: MatDialog
  ) {}

  goInfoDestination(destination: Destin): void {
    this.onGoInfo.emit(destination);
  }

  goEditDestination(destination: Destin): void {
    this.onGoEdit.emit(destination);
  }

  deleteDestination(destination: Destin): void {
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
