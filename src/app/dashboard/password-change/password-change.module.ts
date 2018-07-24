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

import { PasswordChangeRoutingModule } from './password-change-routing.module';
import { PasswordChangeComponent } from './password-change.component';

@NgModule({
  imports: [
    CommonModule,
    PasswordChangeRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    SharedModule
  ],
  declarations: [PasswordChangeComponent]
})
export class PasswordChangeModule { }
