import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  private baseUrl = environment.apiAdminUrl;
  constructor(private http: HttpClient) {}

  readItems(tableName: string, config: ITableConfig) {
    return this.http.post<{ items: any[]; countFiltered: number }>(`${this.baseUrl}/${tableName}/readItems`, config);
  }

  deleteItem(tableName, item) {
    return this.http.post<any>(`${this.baseUrl}/${tableName}/deleteItem`, { item });
  }

  updateItem(tableName, itemId, itemData) {
    return this.http.post<any>(`${this.baseUrl}/${tableName}/updateItem`, { itemId, itemData });
  }
}

export interface ITableConfig {
  filter: string;
  sortDirection: string;
  pageIndex: number;
  pageSize: number;
}
