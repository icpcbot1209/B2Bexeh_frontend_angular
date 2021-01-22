import { environment } from 'src/environments/environment';

export class ApiUrl2 {
  public static getUserById = `${environment.myApiUrl2}/user/getUserById`;
  public static getTenUsers = `${environment.myApiUrl2}/user/getTenUsers`;
}
