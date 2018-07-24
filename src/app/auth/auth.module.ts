import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  declarations: [LoginComponent, RegisterComponent, VerifyEmailComponent, VerifyTokenComponent]
})
export class AuthModule { }
