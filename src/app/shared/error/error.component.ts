import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field = '';
  @Input() label = '';

  control: AbstractControl;

  constructor() {
  }

  ngOnInit() {
    this.control = this.form.get(this.field);
  }

  get firstError() {
    if (!this.control || !this.control.errors) {
      return '';
    }

    const errors = this.control.errors;

    if (errors['required']) {
      return `${this.label} is required`;
    } else if (errors['minlength']) {
      return `${ this.label } should be at least ${errors['minlength'].requiredLength} characters`;
    } else if (errors['maxlength']) {
      return `${ this.label } should be at least ${errors['maxlength'].requiredLength} characters`;
    } else if (errors['email']) {
      return `Invalid email address`;
    } else if (errors['number']) {
      return `${ this.label } should be a number`;
    } else if (errors['positive']) {
      return `${ this.label } should be a positive number`;
    } else if (errors['nonNegative']) {
      return `${ this.label } should be a non-negative number`;
    } else if (errors['integer']) {
      return `${ this.label } should be an integer`;
    } else if (errors['MatchPassword']) {
      return `Password does not match`;
    } else if (errors['location']) {
      return 'Invalide Latitude/Longitude';
    }

    return '';
  }
}
