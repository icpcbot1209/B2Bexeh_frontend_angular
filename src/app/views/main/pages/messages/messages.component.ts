import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { ChatService, IChatContact, IChatConversation } from 'src/app/views/app/applications/chat/chat.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ChattingService } from 'src/app/services/chatting.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild('scroll') scrollRef: PerfectScrollbarComponent;

  constructor(private chattingService: ChattingService) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  getCurrentTime(): string {
    const now = new Date();
    return this.pad(now.getHours(), 2) + ':' + this.pad(now.getMinutes(), 2);
  }

  // tslint:disable-next-line:variable-name
  pad(number, length): string {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
}
