import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INotif, ACTION_TYPES } from 'src/app/interfaces/INotif';
import { NotifService } from 'src/app/services/notif.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-notif-list',
  templateUrl: './notif-list.component.html',
  styleUrls: ['./notif-list.component.scss'],
})
export class NotifListComponent implements OnInit, OnDestroy {
  notifs: INotif[] = [];
  unreadNotifs: INotif[] = [];
  subsNotifs: Subscription;

  limitCounts = 10;

  constructor(public notifService: NotifService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.subsNotifs = this.notifService.listenMyNotifs(this.userService.me, this.limitCounts).subscribe((notifs) => {
      this.notifs = notifs;
      this.unreadNotifs = notifs.filter((x) => !x.is_read);
    });
  }

  ngOnDestroy(): void {
    this.subsNotifs.unsubscribe();
  }

  onClickShowMore(event) {
    event.stopPropagation();

    this.limitCounts += 10;
    this.subsNotifs.unsubscribe();
    this.subsNotifs = this.notifService.listenMyNotifs(this.userService.me, this.limitCounts).subscribe((notifs) => {
      this.notifs = notifs;
      this.unreadNotifs = notifs.filter((x) => !x.is_read);
    });
  }

  onClickNotif(notif: INotif) {
    if (!notif.is_read) this.notifService.markAsRead(notif);

    if (notif.action_payload.is_sender_creator) this.navigateWithReload('/main/myoffers/active-received');
    else this.navigateWithReload('/main/myoffers/active-sent');
  }

  navigateWithReload(uri: string) {
    this.router.navigateByUrl('/auth/loading', { skipLocationChange: true }).then(() => this.router.navigate([uri]));
  }
}
