import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forEach, assign } from 'lodash';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  edit = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    const user = this.auth.user.value;

    this.form = this.fb.group({
      email: [user.email, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      firstname: [user.firstname, Validators.required],
      lastname: [user.lastname, Validators.required],
    });

    forEach(this.form.controls, (ctrl, field) => {
      ctrl.disable();
    });

  }

  toggleEdit() {
    this.edit = !this.edit;

    const user = this.auth.user.value;

    forEach(this.form.controls, (ctrl, field) => {
      if (field === 'realtor') {
        return;
      }

      if (this.edit) {
        ctrl.enable();
      } else {
        ctrl.setValue(user[field])
        ctrl.disable();
      }
    });
  }

  save() {
    this.api.updateProfile(this.form.value)
      .subscribe(
        (res: any) => {
          const user = this.auth.user.value;
          const newUser = assign({}, user, this.form.value);
          this.auth.setUser(newUser);

          this.showMessage('success', 'Profile updated successfully');
          this.toggleEdit();
        },
        err => {
          this.showMessage('error', err.error.data);
        }
      )
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
