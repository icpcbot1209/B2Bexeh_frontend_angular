import { environment } from 'src/environments/environment';

export class ApiUrl2 {
  /** User */
  public static getUserById = `${environment.myApiUrl2}/user/getUserById`;
  public static getTenUsers = `${environment.myApiUrl2}/user/getTenUsers`;

  /** Hope */
  public static createHope = `${environment.myApiUrl2}/hope/createOne`;

  /** Offer */
  public static createOffer = `${environment.myApiUrl2}/offer/createOffer`;
  public static acceptOffer = `${environment.myApiUrl2}/offer/acceptOffer`;
  public static declineOffer = `${environment.myApiUrl2}/offer/declineOffer`;
}
