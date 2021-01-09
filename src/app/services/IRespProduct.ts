export interface IRespProduct {
  category_id: string;
  subcategoryId: string;
  product_id: string;
  producr_id: string;
  releaseDate: Date;
  productName: string;
  createdAt: Date;
  updatedAt: Date;
  isdeleted: boolean;
  createdById: any;
  updatedById: any;
  boxhighestbid: number;
  boxlowestask: number;
  casehighestbid: number;
  caselowestask: number;
  id: string;
  imageUrl: string;
  isActivate: boolean;
  is_featured: boolean;
}
