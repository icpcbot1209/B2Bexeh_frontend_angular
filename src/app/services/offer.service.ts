import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from '../constants/api-url.constant';
import { ApiUrl2 } from '../constants/api-url2';
import { AuthService } from '../shared/auth.service';
import { IRespProduct } from '../interfaces/IRespProduct';
import { IOffer } from '../interfaces/IOffer';
import { IHope } from '../interfaces/IHope';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getMyOffers(tag: string) {
    let userId = this.authService.userId;
    return this.http.post(ApiUrlConstant.GETMYOFFERS, { userId, tag });
  }

  getLatestOffers(data: { categoryId; subcategoryId }) {
    return this.http.post(ApiUrlConstant.GETLATESTOFFERS, data);
  }

  getOffersByProductId(productId) {
    return this.http.post(ApiUrlConstant.GETOFFERSBYPRODUCTID, { productId });
  }

  createOffer() {}

  acceptOffer(offerId) {
    return this.http.post(ApiUrl2.acceptOffer, { offerId });
  }

  declineOffer(offerId) {
    return this.http.post(ApiUrl2.declineOffer, { offerId });
  }

  createHope(hopeData: IHope) {
    return this.http.post<IHope>(ApiUrl2.createHope, hopeData);
  }
}
