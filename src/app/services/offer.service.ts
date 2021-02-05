import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from '../constants/api-url.constant';
import { AuthService } from '../shared/auth.service';
import { IOffer } from '../interfaces/IOffer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  constructor(private http: HttpClient, private authService: AuthService) {}

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
}
