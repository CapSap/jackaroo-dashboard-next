export type SelectedDate = {
  label: string;
  start: string;
  end: string;
};

export type OrdersResponse = {
  success: string;
  orders?: Order[];
  message?: string;
};

export type Order = {
  country: string | null;
  currency: string | null;
  customer_id: string | null;
  days_to_fulfill: number | null;
  discount: number | null;
  dispatch_date: string | null;
  dispatch_point: string | null;
  freight: number | null;
  isams_id: string | null;
  items: string | null;
  order_date: string | null;
  order_id: number;
  parent_oid: string | null;
  postcode: string | null;
  root_oid: string | null;
  shipped_to: string | null;
  split_level: number | null;
  splits_from_root: number | null;
  total: number;
};
