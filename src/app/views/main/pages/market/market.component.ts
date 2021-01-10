import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.scss"],
})
export class MarketComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  tabs = [
    { label: "Products", url: "/main/market/products" },
    { label: "Latest Offers", url: "/main/market/offers" },
    { label: "Popular", url: "/main/market/popular" },
    { label: "New Arrivals", url: "/main/market/new-arrivals" },
    { label: "Watch List", url: "/main/market/watch-list" },
  ];
}
