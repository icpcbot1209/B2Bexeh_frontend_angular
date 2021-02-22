import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'main-listing-time-select',
  templateUrl: './listing-time-select.component.html',
  styleUrls: ['./listing-time-select.component.scss'],
})
export class ListingTimeSelectComponent implements OnInit {
  constructor() {}
  @Output() valueChanged = new EventEmitter<any>();

  listingTime = 24000;

  ngOnInit(): void {}
  onChange(event) {
    this.valueChanged.emit(event.target.value);
  }
}
