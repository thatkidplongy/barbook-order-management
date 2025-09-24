export interface Order {
  id: number;
  product: string;
  qty: number;
  price: number;
}

export interface Summary {
  totalRevenue: number;
  medianOrderPrice: number;
  topProductByQty: string;
  uniqueProductCount: number;
}

export interface CreateOrderRequest {
  product: string;
  qty: number;
  price: number;
}

export interface OrderFilters {
  product?: string;
  limit?: number;
  offset?: number;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  limit: number | null;
  offset: number;
}
