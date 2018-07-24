import { Setter } from './setter';

export class Apartment extends Setter {
  _id = '';
  name = '';
  floorAreaSize = 0;
  pricePerMonth = 0;
  numberOfRooms = 0;
  address = '';
  latitude = 0;
  longitude = 0;
  realtor = new Realtor();
  created = new Date();
  status = 'Available';
  description = '';

  constructor(data?: any) {
    super();

    if (data) {
      this.set(data);
    }
  }

  set(data: any) {

    this.setValue(data, '_id');
    this.setValue(data, 'name');
    this.setValue(data, 'floorAreaSize', 'float');
    this.setValue(data, 'pricePerMonth', 'float');
    this.setValue(data, 'numberOfRooms', 'int');
    this.setValue(data, 'address');
    this.setValue(data, 'latitude', 'float');
    this.setValue(data, 'longitude', 'float');
    this.setValue(data, 'realtor', 'realtor');
    this.setValue(data, 'created', 'date');
    this.setValue(data, 'status');
    this.setValue(data, 'description');

  }

  toUpdate() {
    return {
      _id: this._id,
      name: this.name,
      floorAreaSize: this.floorAreaSize,
      pricePerMonth: this.pricePerMonth,
      numberOfRooms: this.numberOfRooms,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      status: this.status,
      realtor: this.realtor._id,
      description: this.description
    };
  }

  toCreate() {
    return {
      name: this.name,
      floorAreaSize: this.floorAreaSize,
      pricePerMonth: this.pricePerMonth,
      numberOfRooms: this.numberOfRooms,
      address: this.address,
      latitude: this.latitude,
      longitude: this.longitude,
      status: this.status,
      realtor: this.realtor._id,
      description: this.description
    };
  }

}

export class Realtor extends Setter {
  _id = '';
  firstname = '';
  lastname = '';

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

  }
}
