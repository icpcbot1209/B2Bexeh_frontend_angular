import { Component, Input } from '@angular/core';
import { IChat, IMsg } from 'src/app/interfaces/IChat';

@Component({
  selector: 'main-msg-body',
  templateUrl: './msg-body.component.html',
  styleUrls: ['./msg-body.component.css'],
})
export class MsgBodyComponent {
  @Input() msg: IMsg;
  @Input() chat: IChat;
  constructor() {}

  getUser(id: string) {
    return this.chat.me.id === id ? this.chat.me : this.chat.other;
  }
}
