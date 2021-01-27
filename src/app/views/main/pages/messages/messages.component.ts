import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { ChatService, IChatContact, IChatConversation } from 'src/app/views/app/applications/chat/chat.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ChattingService } from 'src/app/services/chatting.service';
import { IUser } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IChat } from 'src/app/interfaces/IChat';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('scroll') scrollRef: PerfectScrollbarComponent;

  chatId;
  tenUsers: IUser[] = [];

  chats: IChat[] = [];
  chatsSubscription: Subscription;

  constructor(private chattingService: ChattingService, private userService: UserService, private route: ActivatedRoute) {
    this.userService.getTenUsers().then((arr) => {
      this.tenUsers = arr;
    });

    this.chats = this.chattingService.chats;
    this.chatsSubscription = this.chattingService.chats$.subscribe((chats) => {
      this.chats = chats;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      if (paramMap.has('chatId')) {
        this.chatId = paramMap.get('chatId');
        console.log(this.chatId);
      } else {
        this.chatId = null;
      }
    });
  }
  ngOnDestroy(): void {
    this.chatsSubscription.unsubscribe();
  }

  getChatById(chats: IChat[], chatId) {
    return chats.find((x) => x.id === chatId);
  }
}
