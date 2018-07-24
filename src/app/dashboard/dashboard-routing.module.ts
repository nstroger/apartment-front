import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'apartments',
        loadChildren: './apartments/apartments.module#ApartmentsModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [ AdminGuard ]
      },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule'
      },
      {
        path: 'password-change',
        loadChildren: './password-change/password-change.module#PasswordChangeModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
