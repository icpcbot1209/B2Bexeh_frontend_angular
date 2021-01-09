import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token;
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getToken() != null) {
      req = req.clone({
        setHeaders: {
          // 'Accept'       : 'application/json',
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });

      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }
}
