import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { IOffer } from 'src/app/interfaces/IOffer';
import { ConfigsService } from 'src/app/services/configs.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-offer-contract',
  templateUrl: './offer-contract.component.html',
  styleUrls: ['./offer-contract.component.scss'],
})
export class OfferContractComponent implements OnChanges {

  constructor(public userService: UserService, public configs: ConfigsService, private offerService: OfferService) {}
  @Input() offer: IOffer;
  @Output() offerChanged = new EventEmitter<IOffer>();

  isEditing = false;
  newQty: number;
  newPrice: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.offer) {
      this.newPrice = changes.offer.currentValue.price;
      this.newQty = changes.offer.currentValue.qty;
    }
  }

  makeTitle(offer: IOffer) {
    if (offer.creator_id === offer.seller_id) { return `${offer.seller_name.toUpperCase()} is offering to sell to ${offer.buyer_name.toUpperCase()}`; }
    return `${offer.buyer_name.toUpperCase()} is offering to buy from ${offer.seller_name.toUpperCase()}`;
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
  onClickEdit() {
    this.isEditing = true;
  }

  async onClickSave() {
    await this.offerService.changeTerms(this.offer.id, this.newPrice, this.newQty).toPromise();
    this.offer.price = this.newPrice;
    this.offer.qty = this.newQty;
    this.offerChanged.emit(this.offer);
    this.isEditing = false;
  }

  isBuyer(): boolean {
    return this.userService.me.id === this.offer.buyer_id;
  }

  isCreator(): boolean {
    return this.userService.me.id === this.offer.creator_id;
  }
}
