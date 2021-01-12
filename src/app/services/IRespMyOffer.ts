export interface IRespMyOffer {
  amount: number;
  bid_and_ask_id: string;
  bid_and_ask_type: string;
  bidder_feedback: string;
  bidder_id: string;
  bidderusername: string;
  categoryName: string;
  courier: any;
  created_at: string;
  createdbyId: any;
  delivered: any;
  expiry_date: string;
  expiry_day: string;
  id: string;
  imageUrl: string;
  is_counter_received: boolean;
  is_counter_sent: boolean;
  is_deleted: boolean;
  is_private: boolean;
  is_read: boolean;
  note: string;
  order_id: any;
  order_status: any;
  payment_date: any;
  payment_method: string;
  payment_time: string;
  paymentdetail: any;
  product_id: string;
  product_name: string;
  producttype: string;
  qty: string;
  seller_feedback: any;
  seller_id: string;
  sellerusername: string;
  shipment_date: any;
  status: any;
  total_amount: number;
  track_no: any;
  transaction_number: string;
  type: string;
  type_of: string;
  type_of_offer: string;
}