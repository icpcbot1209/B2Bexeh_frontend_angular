import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  @Input('contacts') contacts: IUser[];

  constructor(private chattingService: ChattingService) {}

  ngOnInit() {}

  onClickContact(contact: IUser) {
    console.log('click');
    if (window.confirm(`Start chat with ${contact.first_name} ${contact.last_name}?`)) {
      this.chattingService.startChatWith(contact.id);
    }

    return false;
  }
}
