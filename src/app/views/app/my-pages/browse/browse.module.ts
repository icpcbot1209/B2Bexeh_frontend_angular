import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { MatTabsModule } from "@angular/material/tabs";

import { BrowseComponent } from "./browse.component";
import { MarketComponent } from "./market/market.component";
import { LatestOffersComponent } from "./latest-offers/latest-offers.component";
import { PopularComponent } from "./popular/popular.component";
import { NewArrivalsComponent } from "./new-arrivals/new-arrivals.component";
import { WatchListComponent } from "./watch-list/watch-list.component";

const routes: Routes = [
  {
    path: "",
    component: BrowseComponent,
    children: [
      { path: "market", component: MarketComponent },
      { path: "latest_offers", component: LatestOffersComponent },
      { path: "popular", component: PopularComponent },
      { path: "new_arrivals", component: NewArrivalsComponent },
      { path: "watch_list", component: WatchListComponent },
    ],
  },
];

@NgModule({
  declarations: [BrowseComponent, MarketComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatTabsModule],
})
export class BrowseModule {}
