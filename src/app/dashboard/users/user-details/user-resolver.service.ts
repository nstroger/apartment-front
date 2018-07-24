import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { User } from '../../../models/user';
import { ApiService } from '../../../services/api.service';


@Injectable()
export class UserResolverService {

  constructor(
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
    const id = route.paramMap.get('id');

    return new Promise((resolve, reject) => {
      this.api.getUser(id)
        .subscribe(
          (res: any) => {
            if (res.success) {
              resolve(new User(res.data));
            }

            resolve(new User());
          },
          err => {
            resolve(new User());
          }
        );
    });
  }
}
