import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';

import { AuthGuard } from '../guards/auth.guard'
import { UnauthenticatedGuard } from '../guards/unauthenticated.guard'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'verify',
    component: VerifyTokenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
