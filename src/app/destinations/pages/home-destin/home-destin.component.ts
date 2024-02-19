import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-home-destin',
  templateUrl: './home-destin.component.html',
  styleUrls: ['./home-destin.component.css'],
})
export class HomeDestinComponent implements OnInit {
  constructor(
    private destinationService: DestinationService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public destinations: Destin[] = [];

  ngOnInit(): void {
    this.destinationService
      .getDestinations()
      .subscribe((destinations) => (this.destinations = destinations));
  }

  goNewDestination() {
    this.router.navigate(['home/new']);
  }

  reset() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'This action will retrieve the list of source destinations and any changes made will be lost. Do you wish to continue?',
        labelButton: 'Reset',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.destinationService.resetDestinationsOriginal();
      }
    });
  }
}
