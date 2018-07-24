import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/apartments'
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/apartments'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
