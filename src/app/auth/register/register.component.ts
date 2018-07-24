import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { CustomValidators } from '../../helpers/Validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'firstname': ['', Validators.required],

      'lastname': ['', Validators.required],

      'email': ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],

      'password': ['', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])],

      'confirmPassword': ['']
    }, {
      validator: CustomValidators.MatchPassword
    });

  }

  register() {
    this.api.register(this.registerForm.value)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.router.navigate(['/verify-email']);

            this.showMessage('success', 'Register success');
          } else {
            this.showMessage('error', 'Register failed');
          }
        },
        err => {
          this.showMessage('error', 'Register failed');
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
