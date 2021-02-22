import { Subject } from 'rxjs';
import { INotif } from './../interfaces/INotif';
import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { IUser } from '../interfaces/IUser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  notifs: INotif[] = [];
  notifs$ = new Subject<INotif[]>();
  isLoading = false;

  constructor(private afs: AngularFirestore, private router: Router, private userService: UserService, private ngZone: NgZone) {}

  private me: IUser;

  async doInit() {
    this.me = this.userService.me;
    this.listenMyNotifs(this.me);
    this.userService.me$.subscribe((me) => {
      this.me = me;
      this.listenMyNotifs(this.me);
    });
  }

  async listenMyNotifs(me: IUser) {
    if (!me) { return; }
    this.isLoading = true;

    try {
      this.listenMyNotif_FS(me).subscribe(async (arr: INotif[]) => {
        this.notifs$.next(this.notifs);
        this.isLoading = false;
      });
    } catch (err) {
      console.log(err);
      this.isLoading = false;
    }
  }

  private listenMyNotif_FS(me: IUser) {
    return this.afs
      .collection('notifs')
      .doc<any>(me.id)
      .valueChanges()
      .pipe(map((actions) => actions.map((a) => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
  }
}
