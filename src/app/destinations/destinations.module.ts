import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './sections/navbar/navbar.component';
import { SearchComponent } from './sections/search/search.component';
import { MainComponent } from './sections/main/main.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from './pipes/truncate.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    BrowserAnimationsModule,
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
  ],

  providers: [],
})
export class DestinationsModule {}
