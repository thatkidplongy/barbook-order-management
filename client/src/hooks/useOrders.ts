import { useState, useEffect, useCallback } from "react";
import { Order, OrderFilters, OrdersResponse } from "../types";
import { api } from "../api";

export function useOrders(filters: OrderFilters = {}) {
  const [data, setData] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: OrdersResponse = await api.getOrders(filters);
      setData(response.orders);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [filters.product, filters.limit, filters.offset]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { data, total, loading, error, refetch: fetchOrders };
}
