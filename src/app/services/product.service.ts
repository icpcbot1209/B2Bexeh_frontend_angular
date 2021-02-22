import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiUrlConstant } from '../constants/api-url.constant';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  categories = [];
  sportId2Name(id: string) {
    const category = this.categories.find((x) => x.id === id);
    if (!category) {
      return '';
    }
    return category.categoryName;
  }

  getCategories() {
    return this.http.post(ApiUrlConstant.CATEGARTLIST, null).pipe(
      map((resp) => {
        this.categories = resp['data']['rows'] || resp['data'];
        return resp;
      })
    );
  }

  getSubcategories(category_id: string) {
    return this.http.post(ApiUrlConstant.SUBCATEGARTLISTBYCATE, { category_id });
  }

  getProductsByCategory(category_id: string, subcategory_id: string) {
    return this.http.post(`${environment.myApiUrl2}/product/getByCategory`, { category_id, subcategory_id });
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

  getProductById(productId) {
    return this.http.post(ApiUrlConstant.GETPRODUCTBYID, { id: productId }).pipe(
      map((resp) => {
        const arr: any[] = resp['data']['rows'] || resp['data'];
        if (arr && arr.length > 0) {
          return arr[0];
        }
        return null;
      })
    );
  }
}
