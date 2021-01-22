import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { getUserRole } from 'src/app/utils/util';

import { from, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrlConstant } from 'src/app/constants/api-url.constant';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthed = false;
  userId = '';
  constructor(private auth: AngularFireAuth, private http: HttpClient, private router: Router, private userService: UserService) {
    this.autoLogin();
  }

  private autoLogin() {
    if (this.getToken()) {
      this.isAuthed = true;
      this.userId = localStorage.getItem('b2b_auth_userId');
      this.userService.getMe(this.userId);
    }
  }

  setToken(token: string) {
    localStorage.setItem('b2b_auth_token', token);
  }
  getToken() {
    return localStorage.getItem('b2b_auth_token');
  }

  trySignOut() {
    localStorage.removeItem('b2b_auth_token');
    localStorage.removeItem('b2b_auth_role');
    localStorage.removeItem('b2b_auth_username');
    localStorage.removeItem('b2b_auth_userId');
  }

  trySignup(data) {
    return this.http.post(ApiUrlConstant.REGISTER, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  tryLogin(data) {
    return this.http.post(ApiUrlConstant.LOGIN, data).pipe(
      map((res: any) => {
        if (res.code === 200) {
          localStorage.setItem('b2b_auth_token', res['data']['token']);
          let username = res.data.loginData.data[0].first_name + ' ' + res.data.loginData.data[0].last_name;
          if (res.data.loginData.data[0].role == 'admin') {
            localStorage.setItem('b2b_auth_role', 'admin');
            localStorage.setItem('b2b_auth_username', username);
          } else {
            localStorage.setItem('b2b_auth_role', 'user');
            localStorage.setItem('b2b_auth_username', username);
          }
          this.userId = res['data']['params']['_id'];
          this.userService.getMe(this.userId);

          localStorage.setItem('b2b_auth_userId', this.userId);

          this.isAuthed = true;
        }

        return res;
      })
    );
  }

  // tslint:disable-next-line:typedef
  signIn(credentials: ISignInCredentials) {
    return this.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(({ user }) => {
      return user;
    });
  }

  signOut = () => from(this.auth.signOut());

  // tslint:disable-next-line:typedef
  register(credentials: ICreateCredentials) {
    return this.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(async ({ user }) => {
      user.updateProfile({
        displayName: credentials.displayName,
      });
      this.auth.updateCurrentUser(user);
      return user;
    });
  }

  // tslint:disable-next-line:typedef
  sendPasswordEmail(email) {
    return this.auth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  }

  // tslint:disable-next-line:typedef
  resetPassword(credentials: IPasswordReset) {
    return this.auth.confirmPasswordReset(credentials.code, credentials.newPassword).then((data) => {
      return data;
    });
  }

  // tslint:disable-next-line:typedef
  async getUser() {
    const u = await this.auth.currentUser;
    return { ...u, role: getUserRole() };
  }
}
