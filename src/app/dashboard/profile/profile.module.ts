import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,

    SharedModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
