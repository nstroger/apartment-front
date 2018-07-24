import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;

  user$: Subscription;
  isAdmin = false;
  username = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user$ = this.auth.user.subscribe(user => {
      this.isAdmin = user && user.role === 'admin';
      this.username = user ? user.firstname + ' ' + user.lastname : '';
    })

  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goto(url) {
    this.router.navigate([url]);
    this.drawer.close();
  }

}
