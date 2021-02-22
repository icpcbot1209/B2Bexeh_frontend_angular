export interface IUser {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_uid: string;
  role: string;
  status: string;
  photo_url: string;
  email: string;
  user_name: string;
  company_name: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_state: string;
  billing_city: string;
  billing_zipcode: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zipcode: string;

  password?: string;
}
