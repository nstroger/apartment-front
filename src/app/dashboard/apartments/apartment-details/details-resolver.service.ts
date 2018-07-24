import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { map, take, catchError } from 'rxjs/operators';

import { ApartmentsModule } from '../apartments.module';

import { ApiService } from '../../../services/api.service';
import { Apartment } from '../../../models/apartment';

@Injectable()
export class DetailsResolver implements Resolve<any> {

  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Apartment> {
    const id = route.paramMap.get('id');

    return new Promise((resolve, reject) => {
      this.api.getApartment(id)
        .subscribe(
          (res: any) => {
            if (res.success) {
              resolve(new Apartment(res.data));
            }

            resolve(new Apartment());
          },
          err => {
            resolve(new Apartment());
          }
        );
    });
  }
}
