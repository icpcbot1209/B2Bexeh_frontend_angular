export interface IOffer {
  id?: string;
  hope_id?: number;
  product_id?: number;
  creator_id?: number;
  seller_id?: number;
  buyer_id?: number;
  qty: number;
  price: number;
  note: string;
  payment_method: number;
  payment_timing: number;
  is_active?: boolean;
  is_accepted?: boolean;
  created_at?: Date;
  updated_at?: Date;

  /** joined */
  product_name?: string;
  seller_name?: string;
  buyer_name?: string;
  hope_is_ask?: boolean;
  hope_unit?: string;
  hope_deal_method?: string;
  hope_qty?: number;
  hope_price?: number;
}

export class OfferActions {
  public static offer_created = 'offer_created';
}
