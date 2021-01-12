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
}
