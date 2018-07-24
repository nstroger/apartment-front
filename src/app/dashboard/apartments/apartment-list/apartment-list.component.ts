import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { findIndex } from 'lodash';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'size', 'price', 'rooms', 'latitude', 'longitude', 'realtor', 'created', 'status', 'actions'];
  list = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  view = 'list';
  filter: any = {};

  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom = 1;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private apartmentService: ApartmentService
  ) { }

  ngOnInit() {

    this.filter = {
      ...this.apartmentService.filter
    };

    this.view = this.apartmentService.view;

    if (this.auth.user.value.role === 'client') {
      this.displayedColumns = this.displayedColumns.slice(0, -1);
    }

    this.getApartments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateFilter(filter) {
    this.filter = filter;
    this.apartmentService.setFilter(filter);
    this.getApartments();
  }

  getApartments() {
    this.api.filterApartments(this.filter)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.list = res.data;
            this.dataSource.data = res.data.map(apartment => ({
              _id: apartment._id,
              name: apartment.name,
              size: apartment.floorAreaSize,
              price: apartment.pricePerMonth,
              rooms: apartment.numberOfRooms,
              latitude: apartment.latitude,
              longitude: apartment.longitude,
              realtor: apartment.realtor ? apartment.realtor.firstname + ' ' + apartment.realtor.lastname: '',
              created: apartment.created,
              status: apartment.status
            }));

            this.lat = 55;
            this.lng = 0;
            this.zoom = 2.2;
          }
        },
        err => {
          this.list = [];
          this.dataSource.data = [];
        }
      )
  }

  delete(id) {
    this.api.deleteApartment(id)
      .subscribe(
        (res: any) => {
          if (res.success) {
            const newData = [...this.dataSource.data];
            const i = findIndex(newData, {_id: id});
            newData.splice(i, 1);
            this.dataSource.data = newData;

            this.showMessage('success', 'Apartment deleted successfully');
          }
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

  changeView(view) {
    this.view = view;
    this.apartmentService.setView(view);

    if (view === 'list') {
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  openInfo(apartment) {
    this.lat = apartment.latitude;
    this.lng = apartment.longitude;
    this.zoom = 4;
    setTimeout(() => {
      this.zoom = 16;
    });
  }
}
