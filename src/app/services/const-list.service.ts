import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/ICategory';
import { ISubcategory } from '../interfaces/ISubcategory';

@Injectable({
  providedIn: 'root',
})
export class ConstListService {
  constructor(private http: HttpClient) {}

  private categories: ICategory[] = [];

  async getCategories() {
    if (this.categories.length > 0) return this.categories;
    try {
      this.categories = await this.http.post<ICategory[]>(`${environment.myApiUrl2}/product/getCategories`, null).toPromise();
    } catch (err) {
      console.error(err);
    }
    return this.categories;
  }

  async getSubcategories(category_id: string) {
    let arr = [];
    try {
      arr = await this.http
        .post<ISubcategory[]>(`${environment.myApiUrl2}/product/getSubcategories`, { category_id })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return arr;
  }

  dict_unit: IDictItem[] = [
    { uid: 'all', value: 'All' },
    { uid: 'box', value: 'Box' },
    { uid: 'case', value: 'Case' },
  ];

  dict_deal_method: IDictItem[] = [
    { uid: 'all', value: 'All' },
    { uid: 'hobby', value: 'Hobby' },
    { uid: 'blaster', value: 'Blaster' },
    { uid: 'jumbo', value: 'Jumbo' },
    { uid: 'cellos', value: 'Cellos/Fat Packs' },
    { uid: 'choice', value: 'Choice' },
    { uid: 'fotl', value: 'FOTL' },
    { uid: 'fast_break', value: 'Fast Break' },
    { uid: 'hanger', value: 'Hanger' },
    { uid: 'hybrid', value: 'Hybrid' },
    { uid: 'mega', value: 'Mega' },
    { uid: 'retail', value: 'Retail/Other' },
    { uid: 'super_jumbos', value: 'Super Jumbos' },
    { uid: 't_mall', value: 'T-mall' },
    { uid: 'tins', value: 'Tins' },
    { uid: 'x_gaming_only', value: 'x (Gaming Only)' },
  ];

  dict_payment_method: IDictItem[] = [
    { uid: 'paypal', value: 'PayPal' },
    { uid: 'check', value: 'Check' },
    { uid: 'credit_card', value: 'Credit Card' },
  ];

  dict_payment_timing: IDictItem[] = [
    { uid: 'prior', value: 'Prior To Shipping' },
    { uid: 'net7', value: 'Net 7' },
    { uid: 'net14', value: 'net 14' },
  ];

  dict_feedback: IDictItem[] = [
    { uid: 'like', value: 'fa-smile' },
    { uid: 'soso', value: 'fa-meh' },
    { uid: 'dislike', value: 'fa-frown' },
  ];

  dictVal(uid: string, dict: IDictItem[]): string {
    const item = dict.find((x) => x.uid === uid);
    if (item) {
      return item.value;
    }
    return '';
  }
}
export interface IDictItem {
  uid: string;
  value: string;
}
