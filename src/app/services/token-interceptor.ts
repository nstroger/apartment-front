import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.token && req.url.startsWith(environment.BASE_URL)) {

      req = req.clone({
        setHeaders: {
          Authorization: `JWT ${this.auth.token}`
        }
      });

    }

    return next.handle(req);
  }
}
