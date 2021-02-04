import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IOffer_v1 } from 'src/app/interfaces/IOffer_v1';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'main-offer-pending',
  templateUrl: './offer-pending.component.html',
  styleUrls: ['./offer-pending.component.scss'],
})
export class OfferPendingComponent implements OnChanges {
  @Input() offer: IOffer_v1;
  @Input() me: IUser;

  constructor(private offerService: OfferService, private chattingService: ChattingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.me);
  }

  onClickCancel() {}

  onClickAccept() {
    this.offerService.acceptOffer(this.offer.id);
  }

  onClickDecline() {
    this.offerService.declineOffer(this.offer.id);
  }
}
