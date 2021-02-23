import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { LangService } from './shared/lang.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

import { ConfigsService } from './services/configs.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  isMultiColorActive = environment.isMultiColorActive;
  constructor(
    private langService: LangService,
    private renderer: Renderer2,
    private configsService: ConfigsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.langService.init();
    this.authService.autoLogin();
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.renderer.addClass(document.body, 'show');
    // }, 1000);
    // setTimeout(() => {
    //   this.renderer.addClass(document.body, 'default-transition');
    // }, 1500);
  }
}
