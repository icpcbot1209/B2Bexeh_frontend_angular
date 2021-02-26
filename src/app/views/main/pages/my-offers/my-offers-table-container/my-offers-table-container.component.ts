import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferService } from 'src/app/services/offer.service';
import { IOffer } from 'src/app/interfaces/IOffer';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { OfferStepperComponent } from '../../../offer-modals/offer-stepper/offer-stepper.component';

@Component({
  selector: 'main-my-offers-table-container',
  templateUrl: './my-offers-table-container.component.html',
  styleUrls: ['./my-offers-table-container.component.scss'],
})
export class MyOffersTableContainerComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private offerService: OfferService,
    private userService: UserService,
    private snack: SnackService,
    public dialog: MatDialog
  ) {
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const lastUrl = event.urlAfterRedirects.split('/').pop();
        this.getMyOffers(lastUrl);
      }
    });
  }
  private subscription: Subscription;

  isBusy = false;
  offers: IOffer[] = [];
  tag: string;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  async getMyOffers(tag: string) {
    this.tag = tag;
    try {
      const rows: IOffer[] = await this.offerService.getMyOffers(this.userService.me.id, tag).toPromise();
      rows.forEach(async (row) => {
        const buyer = await this.userService.getUserById(row.buyer_id);
        const seller = await this.userService.getUserById(row.seller_id);
        row.buyer_name = buyer.user_name;
        row.seller_name = seller.user_name;
        if (row.buyer_id === this.userService.me.id) {
          row.other = seller;
        } else {
          row.other = buyer;
        }
      });
      this.offers = rows;
    } catch (err) {
      console.error(err);
      this.snack.error(err.message);
    }
    this.isBusy = false;
  }

  handleOfferClicked(offer: IOffer) {
    const dialogRef = this.dialog.open(OfferStepperComponent, {
      data: { offer },
      height: '80vh',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result: IOffer) => {
      if (result) {
      }
    });
  }
}
