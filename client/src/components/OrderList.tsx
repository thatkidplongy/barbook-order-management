import { Order } from "../types";
import { OrderListManager } from "./OrderList/OrderListManager";

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  error: string | null;
  productFilter: string;
  onProductFilterChange: (filter: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function OrderList(props: OrderListProps) {
  return <OrderListManager {...props} />;
}
