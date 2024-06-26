import { Component, Input } from '@angular/core';
import { IChat, IMsg } from 'src/app/interfaces/IChat';
import { OfferActions } from 'src/app/interfaces/IOffer';

@Component({
  selector: 'main-msg-body',
  templateUrl: './msg-body.component.html',
  styleUrls: ['./msg-body.component.scss'],
})
export class MsgBodyComponent {
  @Input() msg: IMsg;
  @Input() chat: IChat;

  OfferActions = OfferActions;

  constructor() {}

  getUser(uid: string) {
    return this.chat.me.user_uid === uid ? this.chat.me : this.chat.other;
  }

  showOffer(offerId) {}
}
