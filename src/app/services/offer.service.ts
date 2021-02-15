import { ChattingService } from './chatting.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from '../constants/api-url.constant';
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
  getMyOffers(tag: string) {
    return this.http.post<IOffer[]>(`${environment.myApiUrl2}/offer/getMyOffers`, { tag });
  }

  createOffer(data: IOffer) {
    return this.http.post<IOffer>(`${environment.myApiUrl2}/offer/createOne`, data).pipe(
      map((offer: IOffer) => {
        let idOther = offer.seller_id === this.userService.me.id ? offer.buyer_id : offer.seller_id;
        this.chattingService.onOfferCreate(idOther, offer.id, offer.note);
        return offer;
      })
    );
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

  markAsPaid(offerId) {
    return this.http.post(`${environment.myApiUrl2}/offer/markAsPaid`, { offerId });
  }

  markAsShipped(offerId) {
    return this.http.post(`${environment.myApiUrl2}/offer/markAsShipped`, { offerId });
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

  statusOffer(offer: IOffer, me?: IUser) {
    if (!me) me = this.userService.me;
    let text = '',
      num = 0;
    if (offer.is_canceled) {
      text = 'Canceled';
      num = 0;
    } else if (!offer.is_accepted) {
      const who = offer.creator_id === me.id ? 'Their' : 'Your';
      text = `Pending ${who} Approval`;
      num = 0;
    } else if (!offer.is_paid || !offer.is_shipped) {
      text = 'Ship / Pay';
      num = 1;
    } else if (offer.is_paid && offer.is_shipped) {
      if ((offer.seller_id === me.id && !offer.feedback2buyer) || (offer.buyer_id === me.id && !offer.feedback2seller)) {
        text = 'Leave Feedback';
        num = 2;
      } else {
        text = 'Completed';
        num = 3;
      }
    }

    return { text, num };
  }
}
