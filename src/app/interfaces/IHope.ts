export interface IHope {
  id?: string;
  is_ask: boolean;
  note: string;
  creator_id?: string;
  created_at?: string;
  updated_at?: string;
  product_id: string;
  qty: number;
  price: number;
  unit: string;
  deal_method?: string;
  /**joined */
  dealer_name?: string;
  product_name?: string;
  release_date?: Date;
}
