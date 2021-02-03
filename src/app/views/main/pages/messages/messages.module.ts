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

import { OfferModalsModule } from 'src/app/views/main/offer-modals/offer-modals.module';

import { MessagesComponent } from './messages.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MsgBodyComponent } from './msg-body/msg-body.component';
import { MaterialModule } from 'src/app/shared/material.module';

const routes: Routes = [
  { path: '', component: MessagesComponent },
  { path: ':chatId', component: MessagesComponent },
];

@NgModule({
  declarations: [MsgBodyComponent, MessagesComponent, ChatListComponent, ContactListComponent, ChatBoxComponent],
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

    MaterialModule,
    OfferModalsModule,
  ],
})
export class MessagesModule {}
