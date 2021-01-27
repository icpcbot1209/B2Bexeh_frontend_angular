import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from '../constants/api-url.constant';
import { ApiUrl2 } from '../constants/api-url2';
import { AuthService } from '../shared/auth.service';
import { ICreateOfferData } from '../views/main/pages/product/product.component';
import { IRespProduct } from '../interfaces/IRespProduct';
import { IOffer } from '../interfaces/IOffer';

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

  createOffer(request: string, product: IRespProduct, data: ICreateOfferData) {
    return this.http.post<IOffer>(ApiUrl2.createOffer, { request, product, ...data });
  }
}
