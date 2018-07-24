import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forEach, assign } from 'lodash';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../services/api.service';
import { CustomValidators } from '../../helpers/Validators'

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255)
      ])],
      confirmPassword: [''],
    }, {
      validator: CustomValidators.MatchPassword
    });
  }

  save() {

    const data = {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.password
    }

    this.api.changePassword(data)
      .subscribe(
        (res: any) => {
          this.showMessage('success', 'Password changed successfully');
          this.form.reset();
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
