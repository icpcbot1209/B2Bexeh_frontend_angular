import { Component, OnInit } from "@angular/core";

@Component({
  selector: "main-listing-time-select",
  templateUrl: "./listing-time-select.component.html",
  styleUrls: ["./listing-time-select.component.scss"],
})
export class ListingTimeSelectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  listingTime: number = 0;
  onChange(listingTime) {}
}
