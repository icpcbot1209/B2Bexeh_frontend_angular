import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INotif } from 'src/app/interfaces/INotif';
import { NotifService } from 'src/app/services/notif.service';

@Component({
  selector: 'app-notif-list',
  templateUrl: './notif-list.component.html',
  styleUrls: ['./notif-list.component.scss'],
})
export class NotifListComponent implements OnInit, OnDestroy {
  notifs: INotif[];
  subsNotifs: Subscription;
  constructor(public notifSerivce: NotifService) {}

  ngOnInit(): void {
    this.notifs = this.notifSerivce.notifs;
    this.subsNotifs = this.notifSerivce.notifs$.subscribe((notifs) => {
      this.notifs = notifs;
    });
  }

  ngOnDestroy(): void {
    this.subsNotifs.unsubscribe();
  }
}
