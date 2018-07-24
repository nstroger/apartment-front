import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {

    if (!this.auth.hasToken()) {

      this.router.navigate(['/login']);
      this.auth.userLoaded = true;

      return false;
    }

    if (this.auth.userLoaded) {
      const user = this.auth.user.value;

      if (user && !user.verified &&
          !(next.url[0] && next.url[0].path === 'verify-email')) {
        this.router.navigate(['/verify-email']);
      }

      return true;
    }

    return new Promise((resolve, reject) => {
      this.api.getProfile()
        .subscribe(
          (res: any) => {
            this.auth.setUser(res.data);

            const user = this.auth.user.value;

            resolve(true);
          },
          err => {
            this.auth.setToken('');
            this.auth.setUser(null);

            this.router.navigate(['/login']);

            resolve(false);
          }
        );
    });

  }
}
