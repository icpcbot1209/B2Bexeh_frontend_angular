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

  boxlowestask?: number;
  boxhighestbid?: number;
  caselowestask?: number;
  casehighestbid?: number;
}

export interface ICategory {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;

  name?: string;
  priority?: string;
}

export interface ISubcategory {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;

  name?: string;
  priority?: string;
}

export interface ICatemap {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;

  category_id?: string;
  subcategory_id?: string;
}
