import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlConstant } from "../constants/api-url.constant";
import { IRespMyOffer } from "./IRespMyOffer";
import { AuthService } from "../shared/auth.service";

@Injectable({
  providedIn: "root",
})
export class MyOffersService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getMyOffers(tag: string) {
    let userId = this.authService.userId;
    return this.http.post(ApiUrlConstant.GETMYOFFERS, { userId, tag });
  }

  getOffers() {
    return this.http.post(ApiUrlConstant.GETMYOFFERS, {});
  }

  getLatestOffers(isAsk: boolean) {
    let data = {
      request: "asks",
      productid: "",
      type: "",
      producttype: "",
    };
    if (!isAsk) return this.http.post(ApiUrlConstant.GETALLBIDS, data);
    else return this.http.post(ApiUrlConstant.GETALLBIDS, data);
  }
}
