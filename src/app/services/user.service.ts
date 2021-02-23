import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/IUser';

import { FileUploadService, makeFileName } from './file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private uploadService: FileUploadService) {}

  me: IUser = null;
  me$ = new Subject<IUser>();

  private users: IUser[] = [];

  async createUser(userData: IUser) {
    const user: IUser = await this.http.post<IUser>(`${environment.myApiUrl2}/user/createUser`, userData).toPromise();
    this.me = user;
    this.me$.next(this.me);
  }

  async getUserByUid(user_uid: string) {
    const k = this.users.findIndex((x) => x.user_uid === user_uid);
    if (k > -1) return this.users[k];

    try {
      const user: IUser = await this.http
        .post<IUser>(`${environment.myApiUrl2}/user/getUserByUid`, { user_uid })
        .toPromise();

      this.users.push(user);
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getUserById(id: string) {
    const k = this.users.findIndex((x) => x.id === id);
    if (k > -1) return this.users[k];

    try {
      const user: IUser = await this.http
        .post<IUser>(`${environment.myApiUrl2}/user/getUserById`, { id })
        .toPromise();

      this.users.push(user);
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getMe(uid: string = null) {
    if (!uid) uid = JSON.parse(localStorage.getItem('b2b_auth_uid'));
    this.me = await this.getUserByUid(uid);
    this.me$.next(this.me);
  }

  updateMe(data) {
    return this.http.post(`${environment.myApiUrl2}/user/updateUser`, data).pipe(
      finalize(() => {
        this.me = { ...this.me, ...data };
        this.me$.next(this.me);
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
