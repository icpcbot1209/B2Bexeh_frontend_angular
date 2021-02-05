export interface IProduct {
  id: string;
  productName: string;
  categoryId: string;
  subcategoryId: string;
  createdById: string;
  releaseDate: Date;
  isdeleted: boolean;
  createdAt: Date;
  updatedById: string;
  updatedAt: Date;
  product_id: string;
  isActivate: boolean;
  is_featured: boolean;

  /** joined */
  imageUrl?: string;
  listingDates?: string;
  boxhighestbid?: number;
  boxlowestask?: number;
  casehighestbid?: number;
  caselowestask?: number;
}
