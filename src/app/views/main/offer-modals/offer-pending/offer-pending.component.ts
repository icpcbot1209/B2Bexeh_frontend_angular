import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IOffer } from 'src/app/interfaces/IOffer';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';
import { payment_methods, payment_timings } from 'src/app/constants/main';

@Component({
  selector: 'main-offer-pending',
  templateUrl: './offer-pending.component.html',
  styleUrls: ['./offer-pending.component.scss'],
})
export class OfferPendingComponent implements OnChanges {
  @Input() offerId: string;
  @Input() me: IUser;
  @Input() other: IUser;

  payment_methods = payment_methods;
  payment_timings = payment_timings;

  offer: IOffer;
  constructor(private offerService: OfferService, private chattingService: ChattingService, private userService: UserService) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.offerId) {
      try {
        let offer = await this.offerService.getOfferById(changes.offerId.currentValue).toPromise();
        if (offer) {
          offer.seller_name = (await this.userService.getUserById(offer.seller_id)).user_name;
          offer.buyer_name = (await this.userService.getUserById(offer.buyer_id)).user_name;

          this.offer = offer;
          console.log(this.offer);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  onClickCancel() {}

  async onClickAccept() {
    try {
      await this.offerService.acceptOffer(this.offer.id).toPromise();

      const idOther = this.other.id;
      this.chattingService.onOfferAccept(idOther, this.offerId);
    } catch (err) {
      console.error(err);
      /**TODO:
       * sanckbar
       */
    }
  }

  onClickDecline() {
    this.offerService.declineOffer(this.offer.id);
  }
}
