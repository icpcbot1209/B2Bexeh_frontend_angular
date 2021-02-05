import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { IChat } from 'src/app/interfaces/IChat';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnChanges, AfterViewInit {
  @Input() chat: IChat;
  @ViewChild('scroll') scrollRef: PerfectScrollbarComponent;

  constructor(private chattingService: ChattingService) {}
  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
  }

  txt: string = '';
  sendMessage() {
    if (this.txt.trim().length === 0) return;
    this.chattingService.sendMessage(this.chat.id, this.txt);
    this.txt = '';
  }

  messageInputKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  markAllAsRead(chat: IChat) {
    this.chattingService.markAllAsRead(chat);
  }

  private scrollToBottom(): void {
    if (this.scrollRef) this.scrollRef.directiveRef.scrollToBottom(0, 500);
  }
}
