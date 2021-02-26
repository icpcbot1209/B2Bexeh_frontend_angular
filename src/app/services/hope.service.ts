import { Injectable } from '@angular/core';
import { IHope } from 'src/app/interfaces/IHope';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth.service';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HopeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  readByProductId(product_id) {
    return this.http.post<IHope[]>(`${env.myApiUrl2}/hope/readByProductId`, { product_id });
  }

  createHope(hopeData: IHope) {
    return this.http.post<IHope>(`${env.myApiUrl2}/hope/createOne`, hopeData);
  }

  updateHope(hopeData: IHope, hopeId: string) {
    return this.http.post<IHope>(`${env.myApiUrl2}/hope/updateOne`, { hopeData, hopeId });
  }

  deleteHope(hopeId: string) {
    return this.http.post<IHope>(`${env.myApiUrl2}/hope/deleteOne`, { hopeId });
  }

  getByCategory(category_id: string, subcategory_id: string) {
    return this.http.post<IHope[]>(`${env.myApiUrl2}/hope/getByCategory`, { category_id, subcategory_id });
  }

  getMyHopes(user_id: string, is_ask: boolean) {
    return this.http.post<IHope[]>(`${env.myApiUrl2}/hope/getMyHopes`, { user_id, is_ask });
  }
}
