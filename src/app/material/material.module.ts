import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';




@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatCommonModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatMenuModule,
  ],
})
export class MaterialModule {}
