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

  getProductById(productId) {
    return this.http.post<IProduct>(`${environment.myApiUrl2}/product/getById`, { id: productId });
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
