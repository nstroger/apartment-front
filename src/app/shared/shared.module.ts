import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material';

import { ErrorComponent } from './error/error.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  declarations: [ErrorComponent],
  exports: [ErrorComponent]
})
export class SharedModule { }
