import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOffer } from 'src/app/interfaces/IOffer';
import { ConfigsService } from 'src/app/services/configs.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-offer-contract',
  templateUrl: './offer-contract.component.html',
  styleUrls: ['./offer-contract.component.scss'],
})
export class OfferContractComponent implements OnInit {
  @Input() offer: IOffer;
  @Output() offerChanged = new EventEmitter<IOffer>();

  constructor(public userService: UserService, public configs: ConfigsService, private offerService: OfferService) {}

  ngOnInit(): void {}

  creatorName(offer: IOffer) {
    if (offer.creator_id === offer.seller_id) return `Seller(${offer.seller_name})`;
    return `Buyer(${offer.buyer_name})`;
  }

  onClickAccept() {
    this.offerService.acceptOffer(this.offer.id).subscribe((resp) => {
      this.offer.is_accepted = true;
      this.offerChanged.emit(this.offer);
    });
  }

  onClickDecline() {
    this.offerService.declineOffer(this.offer.id).subscribe((resp) => {
      this.offer.is_canceled = true;
      this.offerChanged.emit(this.offer);
    });
  }
}
