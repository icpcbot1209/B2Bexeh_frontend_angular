import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LangService } from './shared/lang.service';
import { Injectable } from '@angular/core';
import { ChattingService } from './services/chatting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private langService: LangService, private chattingService: ChattingService) {}

  ngOnInit(): void {
    this.langService.init();
    this.chattingService.initListener();
  }

  ngAfterViewInit(): void {}
}
