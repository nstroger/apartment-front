import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { assign, forEach, find, isEmpty } from 'lodash';
import { MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { take, startWith, map, switchMap } from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { CustomValidators } from '../../../helpers/Validators';

import { Apartment } from '../../../models/apartment';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss']
})
export class ApartmentDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('autoSearch') public searchElement: ElementRef;

  apartment: Apartment;
  form: FormGroup;
  edit = true;
  role = 'client';
  user$: Subscription;
  action = 'new';
  title = 'New Apartment';
  realtors = [];
  clicked = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone : NgZone
  ) {
    this.apartment = new Apartment();
  }

  ngOnInit() {

    this.route.data.pipe(take(1))
      .subscribe((data: any) => {
        this.apartment = data.apartment;
        this.action = data.action;

        if (this.action === 'edit' && this.apartment._id === '') {
          this.router.navigate(['/apartments']);
          setTimeout(() => {
            this.showMessage('error', 'Apartment not found');
          }, 300);
        }
      });

    this.user$ = this.auth.user.subscribe(user => {
      if (user) {
        this.role = user.role;
      } else {
        this.role = '';
      }
    });

    this.form = this.fb.group({
      name: [this.apartment.name, Validators.required],
      floorAreaSize: [
        this.apartment.floorAreaSize,
        Validators.compose([
          Validators.required,
          CustomValidators.number,
          CustomValidators.positive
        ])
      ],
      pricePerMonth: [
        this.apartment.pricePerMonth,
        Validators.compose([
          Validators.required,
          CustomValidators.number,
          CustomValidators.positive
        ])
      ],
      numberOfRooms: [
        this.apartment.numberOfRooms,
        Validators.compose([
          Validators.required,
          CustomValidators.number,
          CustomValidators.positive,
          CustomValidators.integer
        ])
      ],
      address: [this.apartment.address, Validators.required],
      latitude: [this.apartment.latitude, Validators.compose([
        Validators.required,
        CustomValidators.number
      ])],
      longitude: [this.apartment.longitude, Validators.compose([
        Validators.required,
        CustomValidators.number
      ])],
      realtor: [this.apartment.realtor],
      status: [this.apartment.status, Validators.required],
      description: [this.apartment.description]
    });

    if (this.action === 'edit') {
      this.title = 'Apartment Details';

      if (this.role === 'client') {
        this.edit = false;
        forEach(this.form.controls, (v, k) => {
          v.disable();
        })
      }
    } else {
      this.api.lookupIPLocation()
        .subscribe((res: any) => {
          if (res.status === 'success') {
            this.form.patchValue({
              'latitude': res.lat,
              'longitude': res.lon
            });

            this.changeAddress('');
          }
        })
    }

    if (this.role === 'realtor') {
      this.form.removeControl('realtor');
    }

    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new
        google.maps.places.Autocomplete(this.searchElement.nativeElement,
        {types:["address"]});

        autocomplete.addListener("place_changed", ()=> {
          this.ngZone.run(()=>{
            let place: google.maps.places.PlaceResult =
            autocomplete.getPlace();

            if(place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.form.patchValue({
              'address'  : place.formatted_address,
              'latitude' : place.geometry.location.lat(),
              'longitude': place.geometry.location.lng()
            });
          })
        })
      });

    if (this.role === 'admin') {
      this.api.getRealtors()
        .subscribe((res: any) => {
          if (res.success) {
            this.realtors = res.data;

            const r = find(this.realtors, this.apartment.realtor);

            this.form.patchValue({
              realtor: r
            });
          }
        });
    }
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  create() {
    const apartment = new Apartment(this.form.value);

    this.api.createApartment(apartment.toCreate())
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.router.navigate(['/apartments']);

            this.showMessage('success', 'Apartment created successfully');
          }
        },

        (err: any) => {
          this.showMessage('error', err.error.data);
        }
      );
  }

  update() {
    this.apartment.set(this.form.value);

    const data = this.apartment.toUpdate();

    if (this.role === 'realtor') {
      delete data.realtor;
    }

    this.api.updateApartment(data)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.showMessage('success', 'Apartment updated successfully');
          }
        },
        (err: any) => {
          this.showMessage('error', err.error.data);
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

  mapClick(ev) {
    if (this.role === 'client') {
      return;
    }

    this.clicked = null;
    this.api.lookupAddress(ev.coords.lat, ev.coords.lng)
      .subscribe((res: any) => {
        if (res.results[0]) {
          this.clicked = {
            address: res.results[0].formatted_address,
            lat: ev.coords.lat,
            lng: ev.coords.lng
          }
        }
      });
  }

  useAddress() {
    this.form.get('address').setValue(this.clicked.address);
    this.form.get('latitude').setValue(this.clicked.lat);
    this.form.get('longitude').setValue(this.clicked.lng);

    this.clicked = null;
  }

  changeAddress(type) {
    const lat = this.form.value.latitude;
    const lng = this.form.value.longitude;

    this.api.lookupAddress(lat, lng)
      .subscribe(
        (res: any) => {
          if (res.results[0]) {
            this.form.patchValue({
              'address': res.results[0].formatted_address
            });

            this.form.controls.latitude.setErrors(null);
            this.form.controls.longitude.setErrors(null);
          } else if (type) {
            this.form.patchValue({
              'address': ''
            });
          }
        },
        err => {
          if (type) {
            this.form.controls[type].setErrors({
              ...this.form.controls[type].errors,
              location: true
            });
          }
        }
      )
  }
}
