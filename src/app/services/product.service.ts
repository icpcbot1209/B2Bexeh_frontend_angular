import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ApiUrlConstant } from "../constants/api-url.constant";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  categories = [];
  sportId2Name(id: string) {
    let category = this.categories.find((x) => x.id === id);
    if (!category) return "";
    return category.categoryName;
  }

  getCategories() {
    return this.http.post(ApiUrlConstant.CATEGARTLIST, null).pipe(
      map((resp) => {
        this.categories = resp["data"]["rows"] || resp["data"];
        return resp;
      })
    );
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
