import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, first, map } from 'rxjs/operators';
import { SnackService } from '../services/snack.service';

export interface ISignInCredentials {
  email: string;
  password: string;
}

export interface ICreateCredentials {
  email: string;
  password: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  auth$ = new Subject<boolean>();

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    private auth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone,
    private snack: SnackService
  ) {
    this.auth.authState.subscribe((authData: User) => {
      this.setAuthData(authData);
    });
  }

  async autoLogin(): Promise<void> {
    try {
      let auth_token = localStorage.getItem('b2b_auth_token');
      let auth_uid = localStorage.getItem('b2b_auth_uid');

      if (!auth_token) return;
      const data = await this.auth.signInWithCustomToken(auth_token);
      this.setAuthData(data.user);
    } catch (err) {
      console.log(err);
      this.snack.error(err.message);
    }
  }

  private async setAuthData(authData: User): Promise<void> {
    if (authData) {
      const auth_token = await authData.getIdToken();
      const auth_uid = authData.uid;

      localStorage.setItem('b2b_auth_token', auth_token);
      localStorage.setItem('b2b_auth_uid', auth_uid);
      this.ngZone.run(() => {
        this.router.navigate(['/main']);
      });
      this.auth$.next(true);
    } else {
      localStorage.setItem('b2b_auth_token', null);
      localStorage.setItem('b2b_auth_uid', null);
      this.ngZone.run(() => {
        this.router.navigate(['/auth/login']);
      });
      this.auth$.next(false);
    }
  }

  // tslint:disable-next-line:typedef
  emailSignIn(credentials: ISignInCredentials) {
    return this.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  // tslint:disable-next-line:typedef
  emailSignUp(credentials: ICreateCredentials) {
    return this.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  updateEmail(email: string): void {
    this.auth.currentUser
      .then((authData) => {
        authData
          .updateEmail(email)
          .then(async () => {
            this.setAuthData(authData);
            this.snack.success('Email successfully changed');
          })
          .catch((error) => {
            this.snack.error(error.message);
          });
        this.auth.updateCurrentUser(authData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updatePassword(password: string): void {
    this.auth.currentUser
      .then((authData) => {
        authData
          .updatePassword(password)
          .then(() => {
            this.setAuthData(authData);
            this.snack.success('Successfully changed');
          })
          .catch((error) => {
            console.log(error);
            this.snack.error(error.message);
          });

        this.auth.updateCurrentUser(authData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  googleAuth(): void {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(({ user }) => {
        setTimeout(() => {
          this.ngZone.run(() => {
            this.router.navigate(['/main']);
          });
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        this.snack.error(error.message);
      });
  }

  facebookAuth(): void {
    this.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then(({ user }) => {
        setTimeout(() => {
          this.router.navigate(['/main']);
        }, 500);
      })
      .catch((error) => {
        this.ngZone.run(() => {
          console.log(error);
          this.snack.error(error.message);
        });
      });
  }

  // tslint:disable-next-line:typedef
  sendPasswordResetEmail(email) {
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
}
