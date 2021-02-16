import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IOffer } from 'src/app/interfaces/IOffer';
import { IUser } from 'src/app/interfaces/IUser';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-offer-shipment',
  templateUrl: './offer-shipment.component.html',
  styleUrls: ['./offer-shipment.component.scss'],
})
export class OfferShipmentComponent implements OnChanges {
  @Input() offer: IOffer;
  @Output() offerChanged = new EventEmitter<any>();

  seller: IUser;
  buyer: IUser;

  constructor(public userService: UserService, private offerService: OfferService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.offer) {
      let offer: IOffer = changes.offer.currentValue;
      this.userService.getUserById(offer.seller_id).then((user) => {
        this.seller = user;
      });
      this.userService.getUserById(offer.buyer_id).then((user) => {
        this.buyer = user;
      });
    }
  }

  shippedInfo = '';
  async onClickConfirm() {
    if (confirm('shipped?')) {
      this.offerService.markAsShipped(this.offer.id, this.shippedInfo).subscribe((resp) => {
        this.offer.is_shipped = true;
        this.offer.shipped_info = this.shippedInfo;
        this.offer.shipped_at = new Date();
        this.offerChanged.emit(this.offer);
      });
    }
  }
}
