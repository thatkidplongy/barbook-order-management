export type Order = {
  id: number;
  product: string;
  qty: number;
  price: number;
};

export type Summary = {
  totalRevenue: number;
  medianOrderPrice: number;
  topProductByQty: string;
  uniqueProductCount: number;
};

export type CreateOrderRequest = {
  product: string;
  qty: number;
  price: number;
};

export type OrderFilters = {
  product?: string;
  limit?: number;
  offset?: number;
};
