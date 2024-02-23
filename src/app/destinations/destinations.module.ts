import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './sections/navbar/navbar.component';
import { SearchComponent } from './sections/search/search.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HomeDestinComponent } from './pages/home-destin/home-destin.component';
import { NewDestinComponent } from './pages/new-destin/new-destin.component';
import { InfoDestinComponent } from './pages/info-destin/info-destin.component';
import { EditDestinComponent } from './pages/edit-destin/edit-destin.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { UppercaseDirective } from '../directives/forceUppercase.directive';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  exports: [MaterialModule, NavbarComponent, SearchComponent, CardComponent],

  declarations: [
    NavbarComponent,
    SearchComponent,
    CardComponent,
    TruncatePipe,
    HomeDestinComponent,
    NewDestinComponent,
    InfoDestinComponent,
    EditDestinComponent,
    DialogComponent,
    UppercaseDirective,
  ],

  providers: [],
})
export class DestinationsModule {}
