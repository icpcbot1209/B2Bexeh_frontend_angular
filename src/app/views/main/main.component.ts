import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from 'src/app/containers/layout/sidebar/sidebar.service';
import { ChattingService } from 'src/app/services/chatting.service';
import { ConstListService } from 'src/app/services/const-list.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  sidebar: ISidebar;
  subscription: Subscription;
  constructor(private sidebarService: SidebarService, private consts: ConstListService) {}

  ngOnInit(): void {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );

    this.consts.doInit();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
