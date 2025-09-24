import { useState } from "react";
import { CreateOrderRequest, Order } from "../types";
import { api } from "../api";

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (
    orderData: CreateOrderRequest
  ): Promise<Order | null> => {
    try {
      setLoading(true);
      setError(null);
      const newOrder = await api.createOrder(orderData);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
}
