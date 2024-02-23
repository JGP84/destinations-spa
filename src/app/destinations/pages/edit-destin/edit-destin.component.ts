import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'edit-destin',
  templateUrl: 'edit-destin.component.html',
  styleUrls: ['edit-destin.component.css'],
})
export class EditDestinComponent implements OnInit {
  destinForm: FormGroup;

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.destinForm = this.fb.group({
      name: [''],
      capital: [''],
      country_code: [''],
      id: [''],
      description: [''],
      src_img: [''],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destinForm.patchValue(
        this.destinationService.getDestinationById(id) || {}
      );
    }

    const savedFormData = localStorage.getItem('destinForm');
    if (savedFormData) {
      this.destinForm.setValue(JSON.parse(savedFormData));
    }

    this.destinForm.valueChanges.subscribe((formData) => {
      localStorage.setItem('destinForm', JSON.stringify(formData));
    });
  }

  updateDestination() {
    this.destinationService.updateDestination(this.destinForm.value);
    localStorage.removeItem('destinForm');
    this.goBack();
  }

  deleteDestination() {
    const id = this.destinForm.value.id;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: `This action will delete the following destination: ${this.destinForm.value.name}. Do you wish to continue?`,
        labelButton: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.destinationService.deleteDestination(id);
        this.destinForm.reset();
        localStorage.removeItem('destinForm');
        this.goBack();
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
