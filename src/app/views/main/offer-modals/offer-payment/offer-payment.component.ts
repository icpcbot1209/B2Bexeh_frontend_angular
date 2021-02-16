import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IOffer } from 'src/app/interfaces/IOffer';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-offer-payment',
  templateUrl: './offer-payment.component.html',
  styleUrls: ['./offer-payment.component.scss'],
})
export class OfferPaymentComponent implements OnChanges {
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

  ngOnInit() {}

  paidInfo = '';
  async onClickConfirm() {
    if (confirm('paid?')) {
      this.offerService.markAsPaid(this.offer.id, this.paidInfo).subscribe((resp) => {
        this.offer.is_paid = true;
        this.offer.paid_info = this.paidInfo;
        this.offer.paid_at = new Date();
        this.offerChanged.emit(this.offer);
      });
    }
  }
}
