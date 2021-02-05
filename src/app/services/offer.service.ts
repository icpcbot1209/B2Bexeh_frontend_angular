import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from '../constants/api-url.constant';
import { ApiUrl2 } from '../constants/api-url2';
import { AuthService } from '../shared/auth.service';
import { IRespProduct } from '../interfaces/IRespProduct';
import { IOffer_v1 } from '../interfaces/IOffer_v1';
import { IHope } from '../interfaces/IHope';
import { IOffer } from '../interfaces/IOffer';
import { environment } from 'src/environments/environment';

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

  /** Version 2 */
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
}
