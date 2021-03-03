import { Observable, Subject } from 'rxjs';
import { INotif } from '../interfaces/INotif';
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
  constructor(private afs: AngularFirestore, private userService: UserService) {}

  listenMyNotifs(me: IUser, limitCount = 10): Observable<INotif[]> {
    return this.afs
      .collection('notifs')
      .doc(me.id)
      .collection<INotif>('notifs', (ref) => ref.orderBy('timestamp', 'desc').limit(limitCount))
      .valueChanges({ idField: 'id' })
      .pipe(map((arr) => arr.map((notif) => notif)));
  }

  markAsRead(notif: INotif) {
    const me = this.userService.me;

    this.afs.collection('notifs').doc(me.id).collection<INotif>('notifs').doc(notif.id).update({ is_read: true });
  }
}
