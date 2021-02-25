import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LangService } from './shared/lang.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private langService: LangService) {}

  ngOnInit(): void {
    this.langService.init();
  }

  ngAfterViewInit(): void {}
}
