import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDictItem } from '../interfaces/IDictItem';

@Injectable({
  providedIn: 'root',
})
export class ConfigsService {
  loaded = false;
  subjectLoaded = new Subject<boolean>();

  dict_deal_method: IDictItem[] = [];
  dict_offer_status: IDictItem[] = [];
  dict_payment_method: IDictItem[] = [];
  dict_payment_timing: IDictItem[] = [];

  constructor(private http: HttpClient) {}

  initWithMockData() {
    const dict_deal_method: IDictItem[] = [
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

    const dict_offer_status: IDictItem[] = [
      { uid: 'sent', value: 'sent' },
      { uid: 'accepted', value: 'accepted' },
      { uid: 'completed', value: 'completed' },
      { uid: 'canceled', value: 'canceled' },
    ];
    const dict_payment_method: IDictItem[] = [
      { uid: 'paypal', value: 'PayPal' },
      { uid: 'check', value: 'Check' },
      { uid: 'credit_card', value: 'Credit Card' },
    ];
    const dict_payment_timing: IDictItem[] = [
      { uid: 'prior', value: 'Prior To Shipping' },
      { uid: 'net7', value: 'Net 7' },
      { uid: 'net14', value: 'net 14' },
    ];

    this.addRow('dict_deal_method', JSON.stringify(dict_deal_method));
    this.addRow('dict_offer_status', JSON.stringify(dict_offer_status));
    this.addRow('dict_payment_method', JSON.stringify(dict_payment_method));
    this.addRow('dict_payment_timing', JSON.stringify(dict_payment_timing));
  }

  addRow(json_key: string, json_value: string) {
    this.http.post(`${environment.myApiUrl2}/configs/createOne`, { json_key, json_value }).subscribe((resp) => {
      console.log(resp);
    });
  }

  loadConfigs() {
    this.http.post<IRow[]>(`${environment.myApiUrl2}/configs/readAll`, {}).subscribe((rows) => {
      if (rows.length === 0) this.initWithMockData();
      rows.forEach((row: IRow) => {
        if (row.json_key === 'dict_deal_method') this.dict_deal_method = JSON.parse(row.json_value);
        if (row.json_key === 'dict_offer_status') this.dict_offer_status = JSON.parse(row.json_value);
        if (row.json_key === 'dict_payment_method') this.dict_payment_method = JSON.parse(row.json_value);
        if (row.json_key === 'dict_payment_timing') this.dict_payment_timing = JSON.parse(row.json_value);
      });

      this.loaded = true;
      this.subjectLoaded.next(true);
    });
  }

  dictVal(uid: string, dict: IDictItem[]): string {
    let item = dict.find((x) => x.uid === uid);
    if (item) return item.value;
    return '';
  }
}

interface IRow {
  json_key: string;
  json_value: string;
}
