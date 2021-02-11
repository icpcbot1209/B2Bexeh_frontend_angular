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
  constructor(private http: HttpClient, private userService: UserService) {}

  getLatestOffers(data: { categoryId; subcategoryId }) {
    return this.http.post(ApiUrlConstant.GETLATESTOFFERS, data);
  }

  getOffersByProductId(productId) {
    return this.http.post(ApiUrlConstant.GETOFFERSBYPRODUCTID, { productId });
  }

  /** Version 2 */
  getMyOffers(tag: string) {
    return this.http.post<IOffer[]>(`${environment.myApiUrl2}/offer/getMyOffers`, { tag });
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

  markAsPaid(offerId) {
    return this.http.post(`${environment.myApiUrl2}/offer/markAsPaid`, { offerId });
  }

  markAsShipped(offerId) {
    return this.http.post(`${environment.myApiUrl2}/offer/markAsShipped`, { offerId });
  }

  statusOffer(offer: IOffer, me?: IUser) {
    if (!me) me = this.userService.me;
    let text = '',
      num = 0;
    if (offer.is_canceled) {
      text = 'Canceled';
      num = 3;
    } else if (!offer.is_accepted) {
      const who = offer.creator_id === me.id ? 'Their' : 'Your';
      text = `Pending ${who} Approval`;
      num = 0;
    } else if (!offer.is_paid || !offer.is_shipped) {
      text = 'Ship / Pay';
      num = 1;
    } else if (offer.is_paid && offer.is_shipped) {
      if ((offer.seller_id === me.id && !offer.feedback2buyer) || (offer.buyer_id === me.id && !offer.feedback2seller)) text = 'Leave Feedback';
      else text = 'Completed';
      num = 2;
    }

    return { text, num };
  }
}
