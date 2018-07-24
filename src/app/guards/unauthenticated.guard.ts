import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {

    if (this.auth.userLoaded) {

      if (this.auth.hasToken()) {
        this.router.navigate(['/apartments']);

        return false;
      }

      return true;
    }

    return new Promise((resolve, reject) => {
      this.api.getProfile()
        .subscribe(
          (res: any) => {
            this.auth.setUser(res.data);

            this.router.navigate(['/apartments']);

            resolve(false);
          },
          err => {
            this.auth.setToken('');
            this.auth.setUser(null);

            resolve(true);
          }
        );
    });

  }
}
