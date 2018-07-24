import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { assign } from 'lodash';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { CustomValidators } from '../../../helpers/Validators';

@Component({
  selector: 'apartments-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() view = 'list';
  @Input() filter: any = {};

  @Output() filterChange = new EventEmitter();
  @Output() viewChange = new EventEmitter();


  filterVisible = false;
  form: FormGroup;
  ops = [
    {
      val: '',
      label: 'None'
    },
    {
      val: 'gt',
      label: 'greater than'
    },
    {
      val: 'eq',
      label: 'equal to'
    },
    {
      val: 'lt',
      label: 'less than'
    }
  ];
  symbols = {
    'gt': '>',
    'eq': '=',
    'lt': '<'
  };
  isRealtor = false;

  error = '';

  user$: Subscription;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {

    this.form = this.fb.group({
      sizeOp: this.filter.sizeOp || '',
      sizeVal: this.filter.sizeVal || 0,
      priceOp: this.filter.priceOp || '',
      priceVal: this.filter.priceVal || 0,
      roomsOp: this.filter.roomsOp || '',
      roomsVal: this.filter.roomsVal || 0
    });

    this.user$ = this.auth.user.subscribe(user => {
      this.isRealtor = user && (
                       user.role === 'realtor' ||
                       user.role === 'admin');
    });

  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  toggleFilter() {
    this.form.setValue({
      sizeOp: this.filter.sizeOp || '',
      sizeVal: this.filter.sizeVal || 0,
      priceOp: this.filter.priceOp || '',
      priceVal: this.filter.priceVal || 0,
      roomsOp: this.filter.roomsOp || '',
      roomsVal: this.filter.roomsVal || 0
    });
    this.error = '';

    this.filterVisible = !this.filterVisible;
  }

  updateFilter(ev) {

    ev.preventDefault();

    const newFilter: any = {};
    this.error = '';

    if (this.form.value.sizeOp) {
      newFilter.sizeOp = this.form.value.sizeOp;
      newFilter.sizeVal = this.form.value.sizeVal;
      this.checkNumber(newFilter.sizeVal, 'Size');
    }
    if (!this.error && this.form.value.priceOp) {
      newFilter.priceOp = this.form.value.priceOp;
      newFilter.priceVal = this.form.value.priceVal;
      this.checkNumber(newFilter.priceVal, 'Price');
    }
    if (!this.error && this.form.value.roomsOp) {
      newFilter.roomsOp = this.form.value.roomsOp;
      newFilter.roomsVal = this.form.value.roomsVal;
      this.checkNumber(newFilter.roomsVal, 'Number of Rooms');
      if (newFilter.roomsVal && newFilter.roomsVal.indexOf('.') >= 0) {
        this.error = 'Number of Rooms should be an integer';
      }
    }

    if (this.error) {
      return;
    }

    this.filterVisible = false;
    this.filter = newFilter;

    this.filterChange.emit(newFilter);

  }

  changeView(ev) {
    this.viewChange.emit(ev.value);
  }

  remove(field) {
    delete this.filter[field+'Op'];
    delete this.filter[field+'Val'];

    this.filterChange.emit(this.filter);
  }

  checkNumber(val, field) {
    if (typeof val === 'string') {
      val = val.trim();
    }
    const n = Number(val);

    if (val==='' || isNaN(n)) {
      this.error = `${field} should be a number`;
    } else if (n < 0) {
      this.error = `${field} should be greater than or equal to 0`;
    }
  }
}
