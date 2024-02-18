import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destinations.service';
import { Destin } from '../../interfaces/destin.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'edit-destin',
  templateUrl: 'edit-destin.component.html',
  styleUrls: ['edit-destin.component.css'],
})
export class EditDestinComponent implements OnInit {

  constructor(
    private destinationService: DestinationService,
    private router: Router,
    private route: ActivatedRoute
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const destination = this.destinationService.getDestinationById(id);
      if (destination) {
        this.destinForm.setValue(destination);
      }
    }
  }

  updateDestination() {
    const newDestin: Destin = this.destinForm.value;

    this.destinationService.updateDestination(newDestin);

    this.destinForm.reset();
  }


  deleteDestination() {
    const id = this.destinForm.value.id;
    this.destinationService.deleteDestination(id);
    this.destinForm.reset();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
