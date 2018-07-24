import { Setter } from './setter';

export class User extends Setter {
  _id = '';
  firstname = '';
  lastname = '';
  email = '';
  password = '';
  role = 'client';
  verified = false;

  constructor(data?: any) {
    super();

    if (data) {
      this.set(data);
    }
  }

  set(data: any) {
    this.setValue(data, '_id');
    this.setValue(data, 'firstname');
    this.setValue(data, 'lastname');
    this.setValue(data, 'email');
    this.setValue(data, 'password');
    this.setValue(data, 'role');
    this.setValue(data, 'verified');
  }

  toCreate() {

    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      role: this.role,
      verified: this.verified
    };

  }

  toUpdate() {
    const rst: any = {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      role: this.role,
      verified: this.verified
    };

    if (this.password) {
      rst.password = this.password;
    }

    return rst;
  }
}
