import { ChattingService } from './chatting.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOffer } from '../interfaces/IOffer';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient, private userService: UserService, private chattingService: ChattingService) {}

  /** Version 2 */
  getMyOffers(user_id: string, tag: string) {
    return this.http.post<IOffer[]>(`${environment.myApiUrl2}/offer/getMyOffers`, { user_id, tag });
  }

  createOffer(data: IOffer) {
    return this.http.post<IOffer>(`${environment.myApiUrl2}/offer/createOne`, data);
  }

  getOfferById(offerId: string) {
    return this.http.post<IOffer>(`${environment.myApiUrl2}/offer/getOne`, { offerId });
  }

  acceptOffer(offerId) {
    return this.http.post(`${environment.myApiUrl2}/offer/accept`, { offerId });
  }

  declineOffer(offerId) {
    return this.http.post(`${environment.myApiUrl2}/offer/decline`, { offerId });
  }

  markAsPaid(offer_id, paid_info) {
    return this.http.post(`${environment.myApiUrl2}/offer/markAsPaid`, { offer_id, paid_info });
  }

  markAsShipped(offer_id, shipped_info) {
    return this.http.post(`${environment.myApiUrl2}/offer/markAsShipped`, { offer_id, shipped_info });
  }

  giveFeedback2Seller(offerId, feedback2seller) {
    return this.http.post(`${environment.myApiUrl2}/offer/giveFeedback2Seller`, { offerId, feedback2seller });
  }

  giveFeedback2Buyer(offerId, feedback2buyer) {
    return this.http.post(`${environment.myApiUrl2}/offer/giveFeedback2Buyer`, { offerId, feedback2buyer });
  }

  changeTerms(offerId, price, qty) {
    return this.http.post(`${environment.myApiUrl2}/offer/changeTerms`, { offerId, price, qty });
  }

  makeFlowSteps(offer: IOffer) {
    let flowSteps: IFlowStep[] = [];
    if (offer.payment_timing === 'prior') {
      flowSteps = [
        { uid: 'contract', label: 'Contract', state: offer.is_accepted ? 'done' : 'cannot' },
        { uid: 'payment', label: 'Payment', state: offer.is_paid ? 'done' : 'cannot' },
        { uid: 'shipping', label: 'Shipping', state: offer.is_shipped ? 'done' : 'cannot' },
        { uid: 'feedback', label: 'Feedback', state: this.myFeedback(offer) ? 'done' : 'cannot' },
      ];
    } else {
      flowSteps = [
        { uid: 'contract', label: 'Contract', state: offer.is_accepted ? 'done' : 'cannot' },
        { uid: 'shipping', label: 'Shipping', state: offer.is_shipped ? 'done' : 'cannot' },
        { uid: 'payment', label: 'Payment', state: offer.is_paid ? 'done' : 'cannot' },
        { uid: 'feedback', label: 'Feedback', state: this.myFeedback(offer) ? 'done' : 'cannot' },
      ];
    }

    const currentStepId = flowSteps.findIndex((x) => x.state === 'cannot');

    if (currentStepId > -1) {
      flowSteps[currentStepId].state = 'edit';
    }

    return { flowSteps, currentStepId };
  }

  myFeedback(offer): string {
    if (offer.buyer_id === this.userService.me.id) {
      return offer.feedback2seller;
    } else {
      return offer.feedback2buyer;
    }
  }

  statusOffer(offer: IOffer) {
    let status = 'aaa';
    const me = this.userService.me;

    let { flowSteps, currentStepId } = this.makeFlowSteps(offer);

    if (currentStepId > -1) {
      const step = flowSteps[currentStepId];
      if (step.uid === 'contract') {
        const who = offer.creator_id === me.id ? 'Their' : 'Your';
        status = `Pending ${who} Approval`;
      } else if (step.uid === 'payment') {
        const who = offer.buyer_id === me.id ? 'Your' : 'Their';
        status = `Pending ${who} Payment`;
      } else if (step.uid === 'shipping') {
        const who = offer.seller_id === me.id ? 'Your' : 'Their';
        status = `Pending ${who} Shipping`;
      } else if (step.uid === 'feedback') {
        status = 'Leave Feedback';
      }
    } else {
      status = 'Completed';
    }

    return status;
  }
}

export interface IFlowStep {
  uid: 'contract' | 'payment' | 'shipping' | 'feedback';
  label: string;
  state: 'done' | 'edit' | 'cannot';
}
