import { Component, Input } from '@angular/core';
import { IChat, IMsg } from 'src/app/interfaces/IChat';
import { OfferActions } from 'src/app/interfaces/IOffer_v1';

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

  getUser(id: string) {
    return this.chat.me.id === id ? this.chat.me : this.chat.other;
  }
}
