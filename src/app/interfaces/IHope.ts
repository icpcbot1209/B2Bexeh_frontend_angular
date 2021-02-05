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
  user_name?: string;
  product_name?: string;
  release_date?: Date;
}

export const deal_methods = [
  { id: 'All', label: 'All' },
  { id: 'Hobby', label: 'Hobby' },
  { id: 'Blaster', label: 'Blaster' },
  { id: 'Jumbo', label: 'Jumbo' },
  { id: 'Cellos', label: 'Cellos/Fat Packs' },
  { id: 'Choice', label: 'Choice' },
  { id: 'FOTL', label: 'FOTL' },
  { id: 'Fast Break', label: 'Fast Break' },
  { id: 'Hanger', label: 'Hanger' },
  { id: 'Hybrid', label: 'Hybrid' },
  { id: 'Mega', label: 'Mega' },
  { id: 'Retail', label: 'Retail/Other' },
  { id: 'Super Jumbos', label: 'Super Jumbos' },
  { id: 'T-mall', label: 'T-mall' },
  { id: 'Tins', label: 'Tins' },
  { id: 'x (Gaming Only)', label: 'x (Gaming Only)' },
];
