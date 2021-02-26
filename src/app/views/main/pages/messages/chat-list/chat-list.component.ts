import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IChat } from 'src/app/interfaces/IChat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  @Input() chats: IChat[];
  @Input() activeChatId;

  constructor(private router: Router) {}

  ngOnInit() {}

  gotoChat(chatId) {
    this.router.navigate(['main/messages/', chatId]);
  }
}
