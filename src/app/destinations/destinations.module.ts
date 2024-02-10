import { NgModule } from '@angular/core';

import { NavbarComponent } from './sections/navbar/navbar.component';
import { SearchComponent } from './sections/search/search.component';
import { MainComponent } from './sections/main/main.component';
import { SidebarComponent } from './sections/sidebar/sidebar.component';

@NgModule({
  imports: [],
  exports: [NavbarComponent, SearchComponent, MainComponent, SidebarComponent],
  declarations: [
    NavbarComponent,
    SearchComponent,
    MainComponent,
    SidebarComponent,
  ],
  providers: [],
})
export class DestinationsModule {}
