export interface IRespOffer {
  id: number;
  productId: number;
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
  dealer_name: string;
  product_name: string;
  product_type: string;
  sport_name: string;
  release_date: string;
}
