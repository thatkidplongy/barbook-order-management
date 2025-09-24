import {
  Order,
  Summary,
  CreateOrderRequest,
  OrderFilters,
  OrdersResponse,
} from "./types";

const API_BASE = "/api";

export const api = {
  // Get order summary
  async getSummary(): Promise<Summary> {
    const response = await fetch(`${API_BASE}/summary`);
    if (!response.ok) {
      throw new Error("Failed to fetch summary");
    }
    return response.json();
  },

  // Get orders with optional filters
  async getOrders(filters: OrderFilters = {}): Promise<OrdersResponse> {
    const params = new URLSearchParams();
    if (filters.product) params.append("product", filters.product);
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.offset !== undefined)
      params.append("offset", filters.offset.toString());

    const url = `${API_BASE}/orders${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  },

  // Create a new order
  async createOrder(order: CreateOrderRequest): Promise<Order> {
    const response = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create order");
    }

    return response.json();
  },

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE}/health`);
    if (!response.ok) {
      throw new Error("Health check failed");
    }
    return response.json();
  },
};
