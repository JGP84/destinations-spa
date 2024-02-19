import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { delay } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-destin',
  templateUrl: './home-destin.component.html',
  styleUrls: ['./home-destin.component.css'],
})
export class HomeDestinComponent implements OnInit {
  public destinations: Destin[] | undefined;
  public pageDestinations: Destin[] | undefined;

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.destinationService
      .getDestinations()
      .pipe(delay(1000))
      .subscribe((destinations) => {
        this.destinations = destinations;
        const pageEvent: PageEvent = { pageIndex: 0, pageSize: 6, length: destinations.length };
        this.setPage(pageEvent);
      });
  }

  setPage(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (this.destinations && endIndex > this.destinations.length) {
       endIndex = this.destinations.length;
    }

    this.pageDestinations = this.destinations?.slice(startIndex, endIndex);
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
