import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const auth_uid = this.authService.uid;

    if (auth_uid) {
      if (!this.userService.me) await this.userService.getMe(auth_uid);
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
    const auth_uid = this.authService.uid;

    if (auth_uid) {
      if (!this.userService.me) await this.userService.getMe(auth_uid);

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
