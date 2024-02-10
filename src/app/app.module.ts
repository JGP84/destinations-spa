import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DestinationsModule } from './destinations/destinations.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DestinationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
