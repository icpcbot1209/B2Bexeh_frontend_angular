import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"],
})
export class BrowseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  tabs = [
    { label: "Market", url: "/app/browse/market" },
    { label: "Latest Offers", url: "/app/browse/latest_offers" },
    { label: "Popular", url: "/app/browse/popular" },
    { label: "New Arrivals", url: "/app/browse/new_arrivals" },
    { label: "Watch List", url: "/app/browse/watch_list" },
  ];
  activeTab = this.tabs[0];
}
