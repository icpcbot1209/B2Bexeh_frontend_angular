import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private userService: UserService) {}

  getToken() {
    const token = JSON.parse(localStorage.getItem('b2b_auth_token'));
    return token;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.getToken()) {
      if (!this.userService.me) await this.userService.getMe();
      if (route.data.roles.includes(this.userService.me.role)) {
        return true;
      } else {
        this.router.navigate(['/auth/unauthorized']);
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.getToken()) {
      if (!this.userService.me) await this.userService.getMe();

      if (route.data.roles.includes(this.userService.me.role)) {
        return true;
      } else {
        this.router.navigate(['/auth/unauthorized']);
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
