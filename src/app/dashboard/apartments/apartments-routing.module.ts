import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartmentsComponent } from './apartments.component';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';

import { DetailsResolver } from './apartment-details/details-resolver.service';
import { Apartment } from '../../models/apartment';

const routes: Routes = [
  {
    path: '',
    component: ApartmentsComponent,
    children: [
      {
        path: '',
        component: ApartmentListComponent
      },
      {
        path: 'new',
        component: ApartmentDetailsComponent,
        data: {
          apartment: new Apartment(),
          action: 'new'
        }
      },
      {
        path: ':id',
        component: ApartmentDetailsComponent,
        data: {
          action: 'edit'
        },
        resolve: {
          apartment: DetailsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
