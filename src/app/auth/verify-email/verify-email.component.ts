import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  username = '';

  email = new FormControl('');

  constructor(
    private snackBar: MatSnackBar,
    private api: ApiService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.email.setValidators(Validators.compose([
      Validators.required,
      Validators.email
    ]));
  }

  ngOnDestroy() {
  }

  resend() {
    if (this.email.errors) {
      return;
    }

    this.api.resend(this.email.value)
      .subscribe((res: any) => {
        if (res.success) {
          this.showMessage('success', 'Email sent successfully');
        } else {
          this.showMessage('error', res.data);
        }
      }, (err: any) => {
        this.showMessage('error', err.error.data);
      });
  }

  login() {
    this.router.navigate(['/login']);
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
