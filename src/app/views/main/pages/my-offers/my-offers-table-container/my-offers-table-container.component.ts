import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferService } from 'src/app/services/offer.service';
import { IOffer } from 'src/app/interfaces/IOffer';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-offers-table-container',
  templateUrl: './my-offers-table-container.component.html',
  styleUrls: ['./my-offers-table-container.component.scss'],
})
export class MyOffersTableContainerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(private router: Router, private offerService: OfferService, private userService: UserService, private snack: SnackService) {
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let lastUrl = event.urlAfterRedirects.split('/').pop();
        this.getMyOffers(lastUrl);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isBusy = false;
  offers: IOffer[] = [];
  tag: string;
  async getMyOffers(tag: string) {
    this.tag = tag;
    try {
      const rows: IOffer[] = await this.offerService.getMyOffers(tag).toPromise();
      rows.forEach(async (row) => {
        row.buyer_name = (await this.userService.getUserById(row.buyer_id)).user_name;
        row.seller_name = (await this.userService.getUserById(row.seller_id)).user_name;
        if (row.buyer_id === this.userService.me.id) row.other_name = row.seller_name;
        else row.other_name = row.buyer_name;
      });
      this.offers = rows;
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.isBusy = false;
  }
}
