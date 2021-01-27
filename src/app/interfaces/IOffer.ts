export interface IOffer {
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
