import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SnackService } from '../services/snack.service';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/IUser';

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
  uid: string;
  uid$ = new Subject<string>();

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private snack: SnackService,
    private userService: UserService
  ) {
    fireAuth.authState.subscribe((user: User) => {
      this.setAuthData(user);
    });
  }

  private async setAuthData(authData: User): Promise<void> {
    if (authData) {
      const auth_token = await authData.getIdToken();
      const auth_uid = authData.uid;

      localStorage.setItem('b2b_auth_token', JSON.stringify(auth_token));
      localStorage.setItem('b2b_auth_uid', JSON.stringify(auth_uid));

      if (this.uid !== auth_uid) {
        this.uid = auth_uid;
        this.uid$.next(this.uid);

        this.ngZone.run(() => {
          this.router.navigate(['/main/settings/account']);
        });
      }
    } else {
      localStorage.removeItem('b2b_auth_token');
      localStorage.removeItem('b2b_auth_uid');

      this.ngZone.run(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }

  // tslint:disable-next-line:typedef
  async emailSignIn(credentials: ISignInCredentials) {
    const userCredential = await this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password);

    await this.userService.getMe(userCredential.user.uid);
  }

  signOut() {
    this.fireAuth.signOut();
  }

  // tslint:disable-next-line:typedef
  async emailSignUp(userData: IUser) {
    const email = userData.email;
    const password = userData.password;

    const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);

    delete userData.password;
    userData.user_uid = userCredential.user.uid;

    await this.userService.createUser(userData);
  }

  updateEmail(email: string): void {
    this.fireAuth.currentUser
      .then((authData) => {
        authData
          .updateEmail(email)
          .then(async () => {
            this.snack.success('Email successfully changed');
          })
          .catch((error) => {
            this.snack.error(error.message);
          });
        this.fireAuth.updateCurrentUser(authData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updatePassword(password: string): void {
    this.fireAuth.currentUser
      .then((authData) => {
        authData
          .updatePassword(password)
          .then(async () => {
            this.snack.success('Successfully changed');
          })
          .catch((error) => {
            console.log(error);
            this.snack.error(error.message);
          });

        this.fireAuth.updateCurrentUser(authData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  googleAuth(): void {
    this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  facebookAuth(): void {
    this.fireAuth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  // tslint:disable-next-line:typedef
  sendPasswordResetEmail(email) {
    return this.fireAuth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  }

  // tslint:disable-next-line:typedef
  resetPassword(credentials: IPasswordReset) {
    return this.fireAuth.confirmPasswordReset(credentials.code, credentials.newPassword).then((data) => {
      return data;
    });
  }
}
