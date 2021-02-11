import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IOffer } from 'src/app/interfaces/IOffer';
import { IUser } from 'src/app/interfaces/IUser';
import { ChattingService } from 'src/app/services/chatting.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-offer-shipment',
  templateUrl: './offer-shipment.component.html',
  styleUrls: ['./offer-shipment.component.scss'],
})
export class OfferShipmentComponent implements OnInit {
  @Input() offer: IOffer;
  @Output() offerChanged = new EventEmitter<any>();

  constructor(public userService: UserService, private offerService: OfferService) {}

  ngOnInit() {}

  async onClickConfirm() {
    if (confirm('shipped?')) {
      this.offerService.markAsShipped(this.offer.id).subscribe((resp) => {
        this.offer.is_shipped = true;
        this.offerChanged.emit(this.offer);
      });
    }
  }
}
