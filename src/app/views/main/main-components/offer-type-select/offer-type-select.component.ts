import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { productTypes } from 'src/app/constants/product_type';

@Component({
  selector: 'main-offer-type-select',
  templateUrl: './offer-type-select.component.html',
  styleUrls: ['./offer-type-select.component.scss'],
})
export class OfferTypeSelectComponent implements OnInit {
  @Output() valueChanged = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    this.theItem = this.items[0];
  }

  items = productTypes;

  theItem = null;
  onSelectItem(item) {
    this.valueChanged.emit(item.id);
  }
}
