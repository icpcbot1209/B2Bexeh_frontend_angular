import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlConstant } from "../constants/api-url.constant";
import { AuthService } from "../shared/auth.service";

@Injectable({
  providedIn: "root",
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
}
