import { Component } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'new-destin',
  templateUrl: 'new-destin.component.html',
  styleUrls: ['new-destin.component.css'],
})
export class NewDestinComponent {
  constructor(
    private destinationService: DestinationService,
    private router: Router
  ) {}

  destinForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    capital: new FormControl(''),
    country_code: new FormControl(''),
    id: new FormControl(''),
    description: new FormControl(''),
    src_img: new FormControl(''),
  });

  ngOnInit() {
    const savedFormData = localStorage.getItem('newDestinForm');
    if (savedFormData) {
      this.destinForm.setValue(JSON.parse(savedFormData));
    }

    this.destinForm.valueChanges.subscribe((formData) => {
      localStorage.setItem('newDestinForm', JSON.stringify(formData));
    });
  }

  addDestination() {
    const newDestin: Destin = this.destinForm.value;

    this.destinationService.addDestination(newDestin);

    this.destinForm.reset();
    localStorage.removeItem('newDestinForm'); 
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
