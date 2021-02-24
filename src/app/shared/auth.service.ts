import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Subject } from 'rxjs';
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
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    public ngZone: NgZone,
    private snack: SnackService,
    private userService: UserService
  ) {
    // this.auth.setPersistence('LOCAL');
    this.auth.onIdTokenChanged((user: User) => {
      this.setAuthData(user);
    });
  }

  private async setAuthData(authData: User): Promise<void> {
    if (authData) {
      const auth_token = await authData.getIdToken();
      const auth_uid = authData.uid;

      localStorage.setItem('b2b_auth_token', JSON.stringify(auth_token));
      localStorage.setItem('b2b_auth_uid', JSON.stringify(auth_uid));
    } else {
      localStorage.setItem('b2b_auth_token', JSON.stringify(null));
      localStorage.setItem('b2b_auth_uid', JSON.stringify(null));
    }
  }

  // tslint:disable-next-line:typedef
  async emailSignIn(credentials: ISignInCredentials) {
    const userCredential = await this.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    await this.setAuthData(userCredential.user);

    await this.userService.getMe(userCredential.user.uid);

    this.ngZone.run(() => {
      this.router.navigate(['/main/settings/account']);
    });
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      await this.setAuthData(null);

      this.ngZone.run(() => {
        this.router.navigate(['/auth/login']);
      });
    } catch (err) {
      this.snack.error(err.message);
    }
  }

  // tslint:disable-next-line:typedef
  async emailSignUp(userData: IUser) {
    const email = userData.email;
    const password = userData.password;

    const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);

    delete userData.password;
    userData.user_uid = userCredential.user.uid;
    await this.setAuthData(userCredential.user);
    await this.userService.createUser(userData);

    this.ngZone.run(() => {
      this.router.navigate(['/main/settings/account']);
    });
  }

  updateEmail(email: string): void {
    this.auth.currentUser
      .then((authData) => {
        authData
          .updateEmail(email)
          .then(async () => {
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
          .then(async () => {
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
