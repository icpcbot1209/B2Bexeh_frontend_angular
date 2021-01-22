import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HotkeyModule } from 'angular2-hotkeys';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from 'primeng/api';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';

import { MessagesComponent } from './messages.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  { path: '', component: MessagesComponent },
  { path: ':chatId', component: MessagesComponent },
];

@NgModule({
  declarations: [MessagesComponent, ChatListComponent, ContactListComponent, ChatBoxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    HotkeyModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    LayoutContainersModule,
    TranslateModule,
  ],
})
export class MessagesModule {}
