import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';

@Component({
  selector: 'main-offer-payment',
  templateUrl: './offer-payment.component.html',
  styleUrls: ['./offer-payment.component.scss'],
})
export class OfferPaymentComponent implements OnInit {
  @Input() offerId: string;
  @Input() me: IUser;
  @Input() other: IUser;

  constructor(private chattingService: ChattingService) {}

  ngOnInit() {}

  async onClickConfirm() {
    if (confirm('Confirm payment?')) {
      try {
        // TODO: transaction pay api
        const idOther = this.other.id;
        this.chattingService.onOfferPayment(idOther, this.offerId);
      } catch (err) {
        console.error(err);
        /**TODO:
         * sanckbar
         */
      }
    }
  }
}
