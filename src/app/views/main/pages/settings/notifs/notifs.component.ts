import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INotif } from 'src/app/interfaces/INotif';
import { NotifService } from 'src/app/services/notif.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './notifs.component.html',
  styleUrls: ['./notifs.component.scss'],
})
export class NotifsComponent implements OnInit, OnDestroy {
  constructor(private notifService: NotifService, private userService: UserService) {}

  limitCounts = 20;
  notifs: INotif[] = [];
  subsNotifs: Subscription;

  ngOnInit(): void {
    this.subsNotifs = this.notifService.listenMyNotifs(this.userService.me, this.limitCounts).subscribe((arr) => {
      this.notifs = arr;
    });
  }

  ngOnDestroy(): void {
    this.subsNotifs.unsubscribe();
  }

  onClickShowMore() {
    this.limitCounts += 10;
    this.subsNotifs.unsubscribe();
    this.subsNotifs = this.notifService.listenMyNotifs(this.userService.me, this.limitCounts).subscribe((arr) => {
      this.notifs = arr;
    });
  }
}
