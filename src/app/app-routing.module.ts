// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoDestinComponent } from './destinations/pages/info-destin/info-destin.component';
import { NewDestinComponent } from './destinations/pages/new-destin/new-destin.component';
import { EditDestinComponent } from './destinations/pages/edit-destin/edit-destin.component';
import { HomeDestinComponent } from './destinations/pages/home-destin/home-destin.component';


const routes: Routes = [

  { path: 'home', component: HomeDestinComponent },
  { path: 'home/new', component: NewDestinComponent },
  { path: 'home/info/:id', component: InfoDestinComponent },
  { path: 'home/edit/:id', component: EditDestinComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
