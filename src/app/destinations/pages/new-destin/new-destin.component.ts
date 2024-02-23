import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'new-destin',
  templateUrl: 'new-destin.component.html',
  styleUrls: ['new-destin.component.css'],
})
export class NewDestinComponent implements OnInit, OnDestroy {
  destinForm: FormGroup = new FormGroup({});
  formChangesSubscription: Subscription = new Subscription();

  constructor(
    private destinationService: DestinationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.destinForm = new FormGroup({
      name: new FormControl('', Validators.required),
      capital: new FormControl('', Validators.required),
      country_code: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      src_img: new FormControl('', Validators.required),
    });

    const savedFormData = localStorage.getItem('newDestinForm');
    if (savedFormData) {
      this.destinForm.setValue(JSON.parse(savedFormData));
    }

    this.formChangesSubscription = this.destinForm.valueChanges.subscribe((formData) => {
      localStorage.setItem('newDestinForm', JSON.stringify(formData));
    });
  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  addDestination() {
    if (this.destinForm.valid) {
      const newDestin: Destin = this.destinForm.value;

      this.destinationService.addDestination(newDestin);
      this.destinForm.reset();
      localStorage.removeItem('newDestinForm');
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
