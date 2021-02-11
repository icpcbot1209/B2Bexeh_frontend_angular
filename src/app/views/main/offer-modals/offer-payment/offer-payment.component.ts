import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class OfferPaymentComponent implements OnInit {
  @Input() offer: IOffer;
  @Output() offerChanged = new EventEmitter<any>();

  constructor(public userService: UserService, private offerService: OfferService) {}

  ngOnInit() {}

  async onClickConfirm() {
    if (confirm('paid?')) {
      this.offerService.markAsPaid(this.offer.id).subscribe((resp) => {
        this.offer.is_paid = true;
        this.offerChanged.emit(this.offer);
      });
    }
  }
}
