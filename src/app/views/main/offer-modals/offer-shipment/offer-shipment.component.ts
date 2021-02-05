import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';

@Component({
  selector: 'main-offer-shipment',
  templateUrl: './offer-shipment.component.html',
  styleUrls: ['./offer-shipment.component.scss'],
})
export class OfferShipmentComponent implements OnInit {
  @Input() offerId: string;
  @Input() me: IUser;
  @Input() other: IUser;

  constructor(private chattingService: ChattingService) {}

  ngOnInit() {}

  async onClickConfirm() {
    if (confirm('Confirm shipment?')) {
      try {
        // TODO: transaction ship confirm api
        const idOther = this.other.id;
        // this.chattingService.onOfferAccept(idOther, this.offerId);
      } catch (err) {
        console.error(err);
        /**TODO:
         * sanckbar
         */
      }
    }
  }
}
