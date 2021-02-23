import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  getToken() {
    const token = JSON.parse(localStorage.getItem('b2b_auth_token'));
    return token;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.getToken() != null) {
      req = req.clone({
        setHeaders: {
          // 'Accept'       : 'application/json',
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }
}
