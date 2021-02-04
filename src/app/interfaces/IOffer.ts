export interface IOffer {
  id?: number;
  hope_id?: number;
  product_id?: number;
  creator_id?: number;
  qty: number;
  price: number;
  note: string;
  payment_method: number;
  payment_timing: number;
  is_active?: boolean;
  is_accepted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
