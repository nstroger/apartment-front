import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { findIndex } from 'lodash';


import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'verified', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  list = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers() {
    this.api.getAllUsers()
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.dataSource.data = res.data.map(user => ({
              _id: user._id,
              name: user.firstname + ' ' + user.lastname,
              email: user.email,
              role: user.role,
              verified: user.verified
            }));
          }
        },
        err => {
          this.list = [];
        }
      );
  }

  delete(id) {
    this.api.deleteUser(id)
      .subscribe(
        (res: any) => {
          if (res.success) {
            const newData = [...this.dataSource.data];
            const i = findIndex(newData, {_id: id});
            newData.splice(i, 1);
            this.dataSource.data = newData;

            this.showMessage('success', 'User deleted successfully');
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

}
