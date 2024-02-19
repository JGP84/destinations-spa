import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './sections/navbar/navbar.component';
import { SearchComponent } from './sections/search/search.component';
import { MainComponent } from './sections/main/main.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HomeDestinComponent } from './pages/home-destin/home-destin.component';
import { NewDestinComponent } from './pages/new-destin/new-destin.component'; // Asegúrate de que esta ruta de importación es correcta
import { InfoDestinComponent } from './pages/info-destin/info-destin.component';
import { EditDestinComponent } from './pages/edit-destin/edit-destin.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    NavbarComponent,
    SearchComponent,
    MainComponent,
    CardComponent,
  ],

  declarations: [
    NavbarComponent,
    SearchComponent,
    MainComponent,
    CardComponent,
    TruncatePipe,
    HomeDestinComponent,
    NewDestinComponent,
    InfoDestinComponent,
    EditDestinComponent,
    DialogComponent
  ],

  providers: [],
})
export class DestinationsModule {}
