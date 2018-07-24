import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  user = new BehaviorSubject<any>({});
  userLoaded = false;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;

    localStorage.setItem('token', token);
  }

  setUser(user) {
    this.user.next(user);
    this.userLoaded = true;
  }

  hasToken() {
    return !!this.token;
  }

  logout() {
    this.setToken('');
    this.setUser(null);
  }
}
