import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],

      'password': ['', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])]
    });
  }

  login() {

    this.api.login(this.loginForm.value)
      .subscribe(
        (res: any) => {
          if (res.success) {
            const user = res.data.user;

            this.auth.setToken(res.data.token);
            this.auth.setUser(user);

            this.router.navigate(['/apartments']);

            this.showMessage('success', `Welcome ${user.firstname} ${user.lastname}!`);
          } else {
            this.showMessage('error', res.data);
          }
        },
        err => {
          this.showMessage('error', err.error.data);
        }
      );

  }

  showMessage(type, msg) {
    this.snackBar.open(msg, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type
    });
  }

}
