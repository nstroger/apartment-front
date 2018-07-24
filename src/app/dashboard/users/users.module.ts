import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

import { UserResolverService } from './user-details/user-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,

    SharedModule
  ],
  declarations: [UsersComponent, UserListComponent, UserDetailsComponent],
  providers: [UserResolverService]
})
export class UsersModule { }
