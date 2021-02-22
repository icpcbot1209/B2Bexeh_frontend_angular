import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IOffer } from 'src/app/interfaces/IOffer';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'main-offer-feedback',
  templateUrl: './offer-feedback.component.html',
  styleUrls: ['./offer-feedback.component.scss'],
})
export class OfferFeedbackComponent implements OnChanges {
  @Input() offer: IOffer;
  @Output() offerChanged = new EventEmitter<any>();
  constructor(private offerService: OfferService, public userService: UserService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.offer) {
    }
  }

  isBuyer(): boolean {
    return this.userService.me.id === this.offer.buyer_id;
  }

  myFeedback(): string {
    if (this.isBuyer()) { return this.offer.feedback2seller; }
    else { return this.offer.feedback2buyer; }
  }

  theirFeedback(): string {
    if (this.isBuyer()) { return this.offer.feedback2buyer; }
    else { return this.offer.feedback2seller; }
  }

  giveFeedback(feedback: string) {
    if (this.isBuyer()) {
      this.offerService.giveFeedback2Seller(this.offer.id, feedback).subscribe((resp) => {
        this.offer.feedback2seller = feedback;
        this.offerChanged.emit(this.offer);
      });
    } else {
      this.offerService.giveFeedback2Buyer(this.offer.id, feedback).subscribe((resp) => {
        this.offer.feedback2buyer = feedback;
        this.offerChanged.emit(this.offer);
      });
    }
  }
}
