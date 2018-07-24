import { Injectable } from '@angular/core';

const defaultFilter = {
  sizeOp: '',
  sizeVal: 0,
  priceOp: '',
  priceVal: 0,
  roomsOp: '',
  roomsVal: 0
};

@Injectable()
export class ApartmentService {

  filter: any;
  view: string;

  constructor() {
    this.reset();
  }

  setFilter(filter) {
    this.filter = filter;
  }

  setView(v) {
    this.view = v;
  }

  reset() {
    this.view = 'list';
    this.filter = {
      ...defaultFilter
    };
  }
}
