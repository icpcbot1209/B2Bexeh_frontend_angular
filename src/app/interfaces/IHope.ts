export interface IHope {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;

  creator_id?: string;
  product_id?: string;

  is_ask?: boolean;
  qty?: number;
  price?: number;
  unit?: string;
  deal_method?: string;
  note?: string;

  /**joined */
  dealer_name?: string;
  product_name?: string;
  product_img_url?: string;
  release_date?: Date;
}
