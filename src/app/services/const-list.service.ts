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

  async getCategories() {
    let categories = [];
    try {
      categories = await this.http.post<ICategory[]>(`${environment.myApiUrl2}/product/getCategories`, null).toPromise();
    } catch (err) {
      console.error(err);
    }
    return categories;
  }

  async getSubcategories() {
    let subcategories = [];
    try {
      subcategories = await this.http.post<ICategory[]>(`${environment.myApiUrl2}/product/getSubategories`, null).toPromise();
    } catch (err) {
      console.error(err);
    }
    return subcategories;
  }

  async getSubcategoriesByCate(category_id: string) {
    let arr = [];
    try {
      arr = await this.http
        .post<ISubcategory[]>(`${environment.myApiUrl2}/product/getSubcategoriesByCate`, { category_id })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return arr;
  }

  dict_unit: IDictItem[] = [
    { id: 'all', name: 'All' },
    { id: 'box', name: 'Box' },
    { id: 'case', name: 'Case' },
  ];

  dict_deal_method: IDictItem[] = [
    { id: 'all', name: 'All' },
    { id: 'hobby', name: 'Hobby' },
    { id: 'blaster', name: 'Blaster' },
    { id: 'jumbo', name: 'Jumbo' },
    { id: 'cellos', name: 'Cellos/Fat Packs' },
    { id: 'choice', name: 'Choice' },
    { id: 'fotl', name: 'FOTL' },
    { id: 'fast_break', name: 'Fast Break' },
    { id: 'hanger', name: 'Hanger' },
    { id: 'hybrid', name: 'Hybrid' },
    { id: 'mega', name: 'Mega' },
    { id: 'retail', name: 'Retail/Other' },
    { id: 'super_jumbos', name: 'Super Jumbos' },
    { id: 't_mall', name: 'T-mall' },
    { id: 'tins', name: 'Tins' },
    { id: 'x_gaming_only', name: 'x (Gaming Only)' },
  ];

  dict_payment_method: IDictItem[] = [
    { id: 'paypal', name: 'PayPal' },
    { id: 'check', name: 'Check' },
    { id: 'credit_card', name: 'Credit Card' },
  ];

  dict_payment_timing: IDictItem[] = [
    { id: 'prior', name: 'Prior To Shipping' },
    { id: 'net7', name: 'Net 7' },
    { id: 'net14', name: 'net 14' },
  ];

  dict_feedback: IDictItem[] = [
    { id: 'like', name: 'fa-smile' },
    { id: 'soso', name: 'fa-meh' },
    { id: 'dislike', name: 'fa-frown' },
  ];

  id2name(id: string, dict): string {
    const item = dict.find((x) => x.id === id);
    if (item) return item.name;
    return '';
  }
}
export interface IDictItem {
  id: string;
  name: string;
}
