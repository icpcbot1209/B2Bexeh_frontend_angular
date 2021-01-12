import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { Subscription } from "rxjs";
import { MyOffersService } from "src/app/services/my-offers.service";
import { AuthService } from "src/app/shared/auth.service";
import { IRespMyOffer } from "src/app/services/IRespMyOffer";

@Component({
  selector: "app-my-offers-table-container",
  templateUrl: "./my-offers-table-container.component.html",
  styleUrls: ["./my-offers-table-container.component.scss"],
})
export class MyOffersTableContainerComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(private router: Router, private myOffersService: MyOffersService, private snackbar: MatSnackBar) {
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let lastUrl = event.urlAfterRedirects.split("/").pop();
        this.getMyOffers(lastUrl);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isBusy = false;
  offers: IRespMyOffer[] = [];

  getMyOffers(tag: string) {
    this.myOffersService.getMyOffers(tag).subscribe(
      (resp) => {
        console.log(resp);
        this.offers = resp["data"]["rows"] || resp["data"];
        this.isBusy = false;
      },
      (err) => {
        console.log(err);
        this.snackbar.open(err.message, "close", {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000,
          panelClass: ["red-snackbar"],
        });
        this.isBusy = false;
      }
    );
  }
}
