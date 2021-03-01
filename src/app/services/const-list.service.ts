import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/ICategory';
import { ISubcategory } from '../interfaces/ISubcategory';
import { IDealmethod } from '../interfaces/IDealmethod';
import { ICatemap } from '../interfaces/ICateMap';

@Injectable({
  providedIn: 'root',
})
export class ConstListService {
  constructor(private http: HttpClient) {}

  doInit() {
    this.getCategories();
    this.getSubcategories();
    this.getCatemaps();
    this.getDealmethods();
  }

  private categories: ICategory[] = [];
  private subcategories: ISubcategory[] = [];
  private catemaps: ICatemap[] = [];

  async getCategories(reload = false) {
    if (reload || this.categories.length === 0) {
      try {
        this.categories = await this.http.post<ICategory[]>(`${environment.myApiUrl2}/product/getCategories`, null).toPromise();
      } catch (err) {
        console.error(err);
      }
    }

    return this.categories;
  }

  async getSubcategories(reload = false) {
    if (reload || this.subcategories.length === 0) {
      try {
        this.subcategories = await this.http.post<ICategory[]>(`${environment.myApiUrl2}/product/getSubategories`, null).toPromise();
      } catch (err) {
        console.error(err);
      }
    }

    return this.subcategories;
  }

  async getCatemaps(reload = false) {
    if (reload || this.catemaps.length === 0) {
      try {
        this.catemaps = await this.http.post<ICatemap[]>(`${environment.myApiUrl2}/product/getCatemaps`, null).toPromise();
      } catch (err) {
        console.error(err);
      }
    }

    return this.catemaps;
  }

  async getSubcategoriesByCate(category_id: string, reload = false) {
    let arr: ISubcategory[] = [];

    if (!reload && this.catemaps.length > 0 && this.categories.length > 0 && this.subcategories.length > 0) {
      this.catemaps.forEach((catemap) => {
        if (catemap.category_id === category_id) {
          const sub = this.subcategories.find((x) => x.id === catemap.subcategory_id);
          if (sub) arr.push(sub);
        }
      });

      arr.sort((x, y) => {
        if (x.priority > y.priority) return 1;
        if (x.priority === y.priority) return 0;
        return -1;
      });
      return arr;
    }

    try {
      arr = await this.http
        .post<ISubcategory[]>(`${environment.myApiUrl2}/product/getSubcategoriesByCate`, { category_id })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return arr;
  }

  private dealmethods: IDealmethod[] = [];
  async getDealmethods() {
    if (this.dealmethods.length > 0) return this.dealmethods;
    try {
      this.dealmethods = await this.http.post<IDealmethod[]>(`${environment.myApiUrl2}/consts/getDealmethods`, null).toPromise();
    } catch (err) {
      console.error(err);
    }
    return this.dealmethods;
  }

  dict_unit: IDictItem[] = [
    { id: 'all', name: 'All' },
    { id: 'box', name: 'Box' },
    { id: 'case', name: 'Case' },
  ];

  dict_payment_method: IDictItem[] = [
    { id: 'paypal', name: 'PayPal' },
    { id: 'check', name: 'Check' },
    { id: 'credit_card', name: 'Credit Card' },
  ];

  dict_payment_timing: IDictItem[] = [
    { id: 'prior', name: 'Prior To Shipping' },
    { id: 'net7', name: 'Net 7' },
    { id: 'net14', name: 'Net 14' },
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
