import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../../shared/shared.module';

import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentsComponent } from './apartments.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';

import { DetailsResolver } from './apartment-details/details-resolver.service';
import { ApartmentService } from './apartment.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ApartmentsRoutingModule,
    FlexLayoutModule,
    AgmCoreModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule
  ],
  declarations: [ApartmentsComponent, ToolbarComponent, ApartmentDetailsComponent, ApartmentListComponent],
  providers: [DetailsResolver, ApartmentService]
})
export class ApartmentsModule { }
