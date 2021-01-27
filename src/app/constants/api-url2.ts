import { environment } from 'src/environments/environment';

export class ApiUrl2 {
  public static getUserById = `${environment.myApiUrl2}/user/getUserById`;
  public static getTenUsers = `${environment.myApiUrl2}/user/getTenUsers`;
  public static createOffer = `${environment.myApiUrl2}/offer/createOffer`;
}
