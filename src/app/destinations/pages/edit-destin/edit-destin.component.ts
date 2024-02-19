import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'edit-destin',
  templateUrl: 'edit-destin.component.html',
  styleUrls: ['edit-destin.component.css'],
})
export class EditDestinComponent implements OnInit {
  destinForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    capital: new FormControl(''),
    country_code: new FormControl(''),
    id: new FormControl(''),
    description: new FormControl(''),
    src_img: new FormControl(''),
  });

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const destination = this.destinationService.getDestinationById(id);
      this.destinForm.patchValue(destination || {});
    }
  }

  updateDestination() {
    this.destinationService.updateDestination(this.destinForm.value);
    this.destinForm.reset();
  }

  deleteDestination() {
    const currentFormState = { ...this.destinForm.value };

    const id = this.destinForm.value.id;

    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      data: {
        message: `This action will delete the following destination: ${this.destinForm.value.name}. Do you wish to continue?`,
        labelButton: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.destinationService.deleteDestination(id);
        this.destinForm.reset();
        this.router.navigate(['/home']);
      } else {
        this.destinForm.setValue(currentFormState);
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
