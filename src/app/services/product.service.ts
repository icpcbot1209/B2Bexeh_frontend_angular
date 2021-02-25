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

  getProductsByCategory(category_id: string, subcategory_id: string) {
    return this.http.post(`${environment.myApiUrl2}/product/getByCategory`, { category_id, subcategory_id });
  }

  getById(productId) {
    return this.http.post<IProduct>(`${environment.myApiUrl2}/product/getById`, { id: productId });
  }

  getWatchlist(user_id) {
    return this.http.post(`${environment.myApiUrl2}/product/getWatchlist`, { user_id });
  }

  existInWatchlist(user_id, product_id) {
    return this.http.post<boolean>(`${environment.myApiUrl2}/product/existInWatchlist`, { user_id, product_id });
  }

  addToWatchlist(user_id, product_id) {
    return this.http.post(`${environment.myApiUrl2}/product/addToWatchlist`, { user_id, product_id });
  }

  removeFromWatchlist(user_id, product_id) {
    return this.http.post(`${environment.myApiUrl2}/product/removeFromWatchlist`, { user_id, product_id });
  }

  getProductsPopular() {
    return this.http.post(ApiUrlConstant.GETPOPULARPRODUCT, null);
  }

  getProductsNewArrival() {
    return this.http.post(ApiUrlConstant.GETALLNEWPRODUCT, null);
  }
}
