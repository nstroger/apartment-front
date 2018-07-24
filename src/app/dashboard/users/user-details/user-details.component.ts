import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { assign, forEach } from 'lodash';

import { User } from '../../../models/user';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  form: FormGroup;
  edit = true;
  action = 'new';
  title = 'New User';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.data.pipe(take(1))
      .subscribe((data: any) => {
        this.user = data.user;
        this.action = data.action;

        if (this.action === 'edit' && this.user._id === '') {
          this.router.navigate(['/users']);
          setTimeout(() => {
            this.showMessage('error', 'User not found');
          }, 300);
        }
      });

    const obj: any = {
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(255)
      ])],
      role: [this.user.role, Validators.required],
      verified: this.user.verified
    };

    if (this.action === 'new') {
      obj.password = ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ])];
    }

    this.form = this.fb.group(obj);

    if (this.action === 'edit') {
      this.title = 'User Details';
    }
  }

  showMessage(type, msg) {
    this.snackBar.open(msg, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type
    });
  }

  update() {
    const newUser = new User(this.user);
    newUser.set(this.form.value);

    console.log(this.form.value);

    console.log(newUser, newUser.toUpdate());

    this.api.updateUser(newUser.toUpdate())
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.showMessage('success', 'User updated successfully');

            this.user = newUser;
          }
        },
        (err: any) => {
          this.showMessage('error', err.error.data);
        }
      )
  }

  create() {
    const newUser = new User(this.form.value);

    this.api.createUser(newUser.toCreate())
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.router.navigate(['/users']);

            this.showMessage('success', 'User created successfully');
          }
        },

        (err: any) => {
          this.showMessage('error', err.error.data);
        }
      );
  }
}
