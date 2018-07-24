import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.css']
})
export class VerifyTokenComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.route.queryParamMap.pipe(take(1)).subscribe(
      paramMap => {
        const token = paramMap.get('token');

        this.api.verifyToken(token)
          .subscribe(
            (res: any) => {
              if (res.success) {
                const user = res.data.user;

                this.showMessage('success', `Welcome ${user.firstname} ${user.lastname}!`);

                this.auth.setToken(res.data.token);
                this.auth.setUser(user);
              }

              this.router.navigate(['/apartments']);
            },
            err => {
              this.showMessage('error', err.error.data);
              this.auth.logout();
              this.router.navigate(['/login']);
            }
          )
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
