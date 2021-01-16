import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "main-listing-time-select",
  templateUrl: "./listing-time-select.component.html",
  styleUrls: ["./listing-time-select.component.scss"],
})
export class ListingTimeSelectComponent implements OnInit {
  @Output() valueChanged = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  listingTime: number = 24000;
  onChange(event) {
    this.valueChanged.emit(event.target.value);
  }
}
