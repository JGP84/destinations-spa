// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoDestinComponent } from './destinations/pages/info-destin/info-destin.component';
import { NewDestinComponent } from './destinations/pages/new-destin/new-destin.component';
import { EditDestinComponent } from './destinations/pages/edit-destin/edit-destin.component';

const routes: Routes = [
  { path: 'info', component: InfoDestinComponent },
  { path: 'info/:id', component: InfoDestinComponent },
  { path: 'new', component: NewDestinComponent },
  { path: 'edit/:id', component: EditDestinComponent },
  { path: '', redirectTo: '/info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
