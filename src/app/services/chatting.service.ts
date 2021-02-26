import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IUser } from '../interfaces/IUser';
import { IChat, IMsg, IRespChat } from '../interfaces/IChat';
import { UserService } from './user.service';
import { OfferActions } from '../interfaces/IOffer';
import { AuthService } from '../shared/auth.service';
import { firestore, User } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ChattingService {
  chats: IChat[] = [];
  chats$ = new Subject<IChat[]>();

  myUid: string;

  subs: Subscription;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  initListener() {
    this.authService.uid$.subscribe((uid: string) => {
      if (!uid) {
        this.subs.unsubscribe();
        this.chats = [];
        this.chats$.next(this.chats);
      } else if (this.myUid !== uid) {
        this.myUid = uid;
        this.subs = this.listenChats_FS(this.myUid).subscribe(async (arr: IRespChat[]) => {
          this.chats = await this.mergeUserData(arr, this.myUid);
          this.chats$.next(this.chats);
        });
      }
    });
  }

  private async listenMyChats(myUid: string) {}

  private listenChats_FS(myUid) {
    return this.afs
      .collection<IRespChat>('chats', (ref) => ref.where('users', 'array-contains', myUid))
      .snapshotChanges()
      .pipe(map((actions) => actions.map((a) => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
  }

  async mergeUserData(arr: IRespChat[], myUid: string) {
    const chats: IChat[] = [];
    for (let i = 0; i < arr.length; i++) {
      const { id, users, msgs, lastMessageTime, date } = arr[i];

      const otherUid = users[0] === myUid ? users[1] : users[0];

      const me = await this.userService.getUserByUid(myUid);
      const other = await this.userService.getUserByUid(otherUid);

      const chat: IChat = { id, me, other, msgs, lastMessageTime, date };
      chats.push(chat);
    }
    return chats;
  }

  get(chatId) {
    return this.afs
      .collection('chats')
      .doc<any>(chatId)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  async startChatWith(otherUid: string) {
    if (otherUid === this.myUid) return null;

    let chatId;
    const k = this.chats.findIndex((x) => x.other.user_uid === otherUid);
    if (k > -1) {
      chatId = this.chats[k].id;
    } else {
      const newMsg: IMsg = {
        senderUid: this.myUid,
        content: 'Hello!',
        timestamp: Date.now(),
        isRead: false,
      };

      const data = {
        users: [this.myUid, otherUid],
        msgs: [newMsg],
        lastMessageTime: new Date(newMsg.timestamp).toUTCString(),
        date: new Date(newMsg.timestamp).toUTCString(),
      };

      const docRef = await this.afs.collection('chats').add(data);
      chatId = docRef.id;
    }

    return chatId;
  }

  async sendMessage(chatId, content) {
    const senderUid = this.myUid;
    const newMsg: IMsg = {
      senderUid,
      content,
      timestamp: Date.now(),
      isRead: false,
    };

    const ref = this.afs.collection('chats').doc(chatId);
    return ref.update({
      msgs: firestore.FieldValue.arrayUnion(newMsg),
      lastMessageTime: new Date(newMsg.timestamp).toUTCString(),
      date: new Date(newMsg.timestamp).toUTCString(),
    });
  }

  async markAllAsRead(chat: IChat) {
    chat.msgs.forEach((msg, i) => {
      if (msg.senderUid !== this.myUid) {
        msg.isRead = true;
      }
    });

    const ref = this.afs.collection('chats').doc(chat.id);
    ref.update({
      msgs: chat.msgs,
    });
  }
}
