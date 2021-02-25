import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IUser } from '../interfaces/IUser';
import { IChat, IMsg, IRespChat } from '../interfaces/IChat';
import { UserService } from './user.service';
import { IOffer, OfferActions } from '../interfaces/IOffer';

@Injectable({
  providedIn: 'root',
})
export class ChattingService {
  me: IUser;
  chats: IChat[] = [];
  chats$ = new Subject<IChat[]>();
  isLoading = false;

  constructor(private afs: AngularFirestore, private router: Router, private userService: UserService, private ngZone: NgZone) {}

  async doInit() {
    this.me = this.userService.me;
    this.readMyChats(this.me);
    this.userService.me$.subscribe((me) => {
      this.me = me;
      this.readMyChats(this.me);
    });
  }

  private async readMyChats(me: IUser) {
    if (!me) {
      return;
    }
    this.isLoading = true;

    try {
      this.listenChats_FS(me).subscribe(async (arr: IRespChat[]) => {
        this.chats = await this.mergeUserData(arr);
        this.chats$.next(this.chats);
        this.isLoading = false;
      });
    } catch (err) {
      console.error(err);
      this.isLoading = false;
    }
  }

  private listenChats_FS(me: IUser) {
    return this.afs
      .collection<IRespChat>('chats', (ref) => ref.where('users', 'array-contains', me.id))
      .snapshotChanges()
      .pipe(map((actions) => actions.map((a) => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
  }

  async mergeUserData(arr: IRespChat[]) {
    const chats: IChat[] = [];
    for (let i = 0; i < arr.length; i++) {
      const { id, users, msgs, lastMessageTime, date } = arr[i];
      const idOther = users[0] !== this.me.id ? users[0] : users[1];
      const other = await this.userService.getUserById(idOther);
      const chat: IChat = { id, me: this.me, other, msgs, lastMessageTime, date };
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

  async startChatWith(idOther: string) {
    if (idOther === this.me.id) {
      return null;
    }
    let chatId;
    const k = this.chats.findIndex((x) => x.other.id === idOther);
    if (k > -1) {
      chatId = this.chats[k].id;
    } else {
      const newMsg: IMsg = {
        senderId: this.me.id,
        content: 'Hello!',
        timestamp: Date.now(),
        isRead: false,
      };

      const data = {
        users: [this.me.id, idOther],
        msgs: [newMsg],
        lastMessageTime: new Date(newMsg.timestamp).toUTCString(),
        date: new Date(newMsg.timestamp).toUTCString(),
      };

      const docRef = await this.afs.collection('chats').add(data);
      chatId = docRef.id;
    }

    return chatId;
    // this.router.navigate(['/me/messages', chatId]);
  }

  async sendMessage(chatId, content) {
    const senderId = this.me.id;
    const newMsg: IMsg = {
      senderId,
      content,
      timestamp: Date.now(),
      isRead: false,
    };

    const ref = this.afs.collection('chats').doc(chatId);
    return ref.update({
      msgs: firebase.firestore.FieldValue.arrayUnion(newMsg),
      lastMessageTime: new Date(newMsg.timestamp).toUTCString(),
      date: new Date(newMsg.timestamp).toUTCString(),
    });
  }

  async markAllAsRead(chat: IChat) {
    chat.msgs.forEach((msg, i) => {
      if (msg.senderId !== this.me.id) {
        msg.isRead = true;
      }
    });

    const ref = this.afs.collection('chats').doc(chat.id);
    ref.update({
      msgs: chat.msgs,
    });
  }

  async onOfferCreate(idOther: string, idOffer: string, note: string) {
    const chatId = await this.startChatWith(idOther);
    if (!chatId) {
      return;
    }
    // await this.sendMessage(chatId, { action: OfferActions.offer_created, value: idOffer });

    await this.sendMessage(chatId, note);

    // this.ngZone.run(() => {
    //   this.router.navigate(['/main/messages/', chatId]);
    // });
  }

  async onOfferAccept(idOther, offerId) {
    const chatId = await this.startChatWith(idOther);
    if (!chatId) {
      return;
    }
    await this.sendMessage(chatId, { action: OfferActions.offer_accepted, value: offerId });

    this.ngZone.run(() => {
      this.router.navigate(['/main/messages/', chatId]);
    });
  }

  async onOfferPayment(idOther, offerId) {
    const chatId = await this.startChatWith(idOther);
    if (!chatId) {
      return;
    }
    await this.sendMessage(chatId, { action: OfferActions.offer_paid, value: offerId });

    this.ngZone.run(() => {
      this.router.navigate(['/main/messages/', chatId]);
    });
  }
}
