import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { Subscription } from "rxjs";
import { MyOffersService } from "src/app/services/my-offers.service";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "app-my-offers",
  templateUrl: "./my-offers.component.html",
  styleUrls: ["./my-offers.component.scss"],
})
export class MyOffersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  tabs = [
    { label: "Active Received", url: "/main/myoffers/active-received" },
    { label: "Active Sent", url: "/main/myoffers/active-sent" },
    { label: "Closed Received", url: "/main/myoffers/closed-received" },
    { label: "Closed Sent", url: "/main/myoffers/closed-sent" },
  ];
}
