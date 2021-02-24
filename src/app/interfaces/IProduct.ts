export interface IProduct {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;

  name?: string;
  category_id?: string;
  subcategory_id?: string;
  release_date?: Date;
  photo_url?: string;

  listingDates?: any;
}
