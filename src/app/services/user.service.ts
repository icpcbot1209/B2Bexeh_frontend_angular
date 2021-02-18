import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ApiUrl2 } from 'src/app/constants/api-url2';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/IUser';

import { FileUploadService, makeFileName } from './file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private uploadService: FileUploadService) {}

  //test purpose
  async getTenUsers(): Promise<IUser[]> {
    let resp = await this.http.post(ApiUrl2.getTenUsers, {}).toPromise();
    let arr = resp['data']['rows'] || resp['data'];
    arr.forEach((user) => {
      if (!user.profile_image_url || user.profile_image_url === '') user.profile_image_url = 'assets/img/profiles/user-avatar-placeholder.png';
    });
    return arr;
  }

  me: IUser = null;
  me$ = new Subject<IUser>();

  async getMe(id: string) {
    this.me = await this.getUserById(id);
    this.me$.next(this.me);
  }

  private users: IUser[] = [];
  async getUserById(userId: any) {
    let k = this.users.findIndex((x) => x.id === userId);
    if (k > -1) return this.users[k];

    try {
      const resp = await this.http.post(ApiUrl2.getUserById, { userId }).toPromise();
      if (resp['data'] && resp['data']['rows'] && resp['data']['rows'].length > 0) {
        const user: IUser = resp['data']['rows'][0];
        if (!user.profile_image_url || user.profile_image_url === '') user.profile_image_url = 'assets/img/profiles/user-avatar-placeholder.png';
        this.users.push(user);
        return user;
      } else {
        console.log('No user found');
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  updateUser(data: IUser) {
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
