import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './sections/navbar/navbar.component';
import { SearchComponent } from './sections/search/search.component';
import { MainComponent } from './sections/main/main.component';
import { SidebarComponent } from './sections/sidebar/sidebar.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [MaterialModule, NavbarComponent, SearchComponent, MainComponent, SidebarComponent, CardComponent],

  declarations: [
    NavbarComponent,
    SearchComponent,
    MainComponent,
    SidebarComponent,
    CardComponent
  ],

  providers: [],
})
export class DestinationsModule {}
