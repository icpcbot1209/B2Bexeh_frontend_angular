import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ApiUrlConstant } from "../constants/api-url.constant";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.post(ApiUrlConstant.CATEGARTLIST, null);
  }

  getSubcategories(category_id: string) {
    return this.http.post(ApiUrlConstant.SUBCATEGARTLISTBYCATE, { category_id });
  }

  getProductsByCategory(category_id: string, subcategory_id: string) {
    return this.http.post(ApiUrlConstant.PRODUCTBYEARLIST, { category_id, subcategory_id });
  }

  getProductsPopular() {
    return this.http.post(ApiUrlConstant.GETPOPULARPRODUCT, null);
  }

  getProductsNewArrival() {
    return this.http.post(ApiUrlConstant.GETALLNEWPRODUCT, null);
  }

  getProductsWatchList(userId) {
    return this.http.post(ApiUrlConstant.GETALLWATCHLIST, { userId });
  }
}
