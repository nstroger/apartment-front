import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.auth.user.value.role === 'admin') {
      return true;
    }

    this.router.navigate(['/apartments']);

    return false;
  }
}
