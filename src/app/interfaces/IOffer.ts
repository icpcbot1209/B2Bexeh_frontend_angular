export interface IOffer {
  id?: string;
  hope_id?: string;
  product_id?: string;
  creator_id?: string;
  seller_id?: string;
  buyer_id?: string;
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
  other_name?: string;
  hope_is_ask?: boolean;
  hope_unit?: string;
  hope_deal_method?: string;
  hope_qty?: number;
  hope_price?: number;
  total: number;
}

export class OfferActions {
  public static offer_created = 'offer_created';
  public static offer_accepted = 'offer_accepted';
  public static offer_paid = 'offer_paid';
}
