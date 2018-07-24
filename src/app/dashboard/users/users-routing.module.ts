import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { UserResolverService } from './user-details/user-resolver.service';

import { User } from '../../models/user';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'new',
        component: UserDetailsComponent,
        data: {
          user: new User(),
          action: 'new'
        }
      },
      {
        path: ':id',
        component: UserDetailsComponent,
        resolve: {
          user: UserResolverService
        },
        data: {
          action: 'edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
