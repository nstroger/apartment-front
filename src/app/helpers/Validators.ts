import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static positive(control: AbstractControl):{ [key: string]: any; } {
    if (Number(control.value) <= 0) {
      return {positive: true};
    } else {
      return null;
    }
  }

  static nonNegative(control: AbstractControl):{ [key: string]: any; } {
    if (Number(control.value) < 0) {
      return {nonNegative: true};
    } else {
      return null;
    }
  }

  static integer(control: AbstractControl):{ [key: string]: any; } {
    const n = Number(control.value);
    if (n !== Math.floor(n)) {
      return {integer: true};
    } else {
      return null;
    }
  }

  static number(control: AbstractControl): { [key: string]: any } {
    if (isNaN(Number(control.value))) {
      return {number: true};
    } else {
      return null
    }
  }

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;

    if(password != confirmPassword) {
      AC.get('confirmPassword').setErrors( { MatchPassword: true } )
    } else {
      return null
    }
  }
}
