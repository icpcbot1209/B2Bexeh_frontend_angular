export interface IOffer_v1 {
  id: number;
  productid: number;
  producttype: string;
  amount: number;
  isdeleted: boolean;
  createdAt: string;
  createdbyId: string;
  updatedAt: string;
  updatedbyId: number;
  request: string;
  type: string;
  note: string;
  maxQuantity: number;
  minQuantity: number;
  subtype: string;
  isactive: boolean;
  isaddtocart: boolean;
  isPrivate: boolean;
}

export class OfferActions {
  public static offer_created = 'offer_created';
}
