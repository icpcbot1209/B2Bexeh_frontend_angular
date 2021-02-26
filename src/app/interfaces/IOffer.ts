import { dateSelectionJoinTransformer } from '@fullcalendar/angular';
import { IUser } from './IUser';

export interface IOffer {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;

  hope_id?: string;
  product_id?: string;
  creator_id?: string;
  seller_id?: string;
  buyer_id?: string;

  qty: number;
  price: number;
  unit?: string;
  deal_method: string;
  note: string;
  payment_terms?: any;
  shipping_terms?: any;

  paid_info?: string;
  paid_at?: Date;
  shipped_info?: string;
  shipped_at?: Date;

  is_accepted?: boolean;
  is_paid?: boolean;
  is_shipped?: boolean;

  feedback2seller?: string;
  feedback2buyer?: string;

  is_canceled?: boolean;

  /** joined */
  product_name?: string;
  seller_name?: string;
  buyer_name?: string;
  other?: IUser;
  hope_is_ask?: boolean;
  // hope_unit?: string;
  // hope_deal_method?: string;
  // hope_qty?: number;
  // hope_price?: number;
  total?: number;
}

export class OfferActions {
  public static offer_created = 'offer_created';
  public static offer_accepted = 'offer_accepted';
  public static offer_paid = 'offer_paid';
  public static offer_shipped = 'offer_shipped';
}
