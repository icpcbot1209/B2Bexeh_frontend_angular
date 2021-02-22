import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/IUser';
import { AuthService } from '../shared/auth.service';

import { FileUploadService, makeFileName } from './file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService, private uploadService: FileUploadService) {
    this.authService.auth$.subscribe((isAuthed) => {
      if (!isAuthed) {
        this.me = null;
        this.me$.next(null);
      } else {
        this.getMe();
      }
    });
  }

  me: IUser = null;
  me$ = new Subject<IUser>();

  private users: IUser[] = [];

  // test purpose
  async getTenUsers(): Promise<IUser[]> {
    return [];
  }

  async getMe(id: string = null) {
    if (!id) id = localStorage.getItem('b2b_auth_uid');

    this.me = await this.getUserById(id);
    this.me$.next(this.me);
  }

  async getUserById(user_uid: string) {
    const k = this.users.findIndex((x) => x.user_uid === user_uid);
    if (k > -1) {
      return this.users[k];
    }

    try {
      const user: IUser = await this.http
        .post<IUser>(`${environment.myApiUrl2}/profile/getByUserUid`, { user_uid })
        .toPromise();

      this.users.push(user);
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  updateMe(data: IUser) {
    return this.http.post(`${environment.myApiUrl2}/user/updateUser`, data).pipe(
      finalize(() => {
        this.me = data;
        this.me$.next(data);
      })
    );
  }

  async uploadUserAvatar(file: File, email: string) {
    const dirPath = '/user-profiles';
    const fileName = makeFileName(file, email);

    const downloadURL = await this.uploadService.pushFileToStorage(file, dirPath, fileName);
    return downloadURL;
  }
}
