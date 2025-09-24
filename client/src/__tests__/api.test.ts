import { api } from "../api";
import {
  Order,
  Summary,
  CreateOrderRequest,
  OrderFilters,
  OrdersResponse,
} from "../types";

// Mock fetch globally
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSummary", () => {
    it("should fetch summary successfully", async () => {
      const mockSummary: Summary = {
        totalRevenue: 1000.5,
        medianOrderPrice: 25.25,
        topProductByQty: "Apple",
        uniqueProductCount: 15,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockSummary,
      } as Response);

      const result = await api.getSummary();

      expect(result).toEqual(mockSummary);
      expect(mockFetch).toHaveBeenCalledWith("/api/summary");
    });

    it("should handle fetch errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(api.getSummary()).rejects.toThrow("Network error");
    });

    it("should handle non-ok responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(api.getSummary()).rejects.toThrow("Failed to fetch summary");
    });

    it("should handle JSON parsing errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      } as Response);

      await expect(api.getSummary()).rejects.toThrow("Invalid JSON");
    });
  });

  describe("getOrders", () => {
    it("should fetch orders without filters", async () => {
      const mockResponse: OrdersResponse = {
        orders: [
          { id: 1, product: "Apple", qty: 5, price: 2.0 },
          { id: 2, product: "Banana", qty: 3, price: 1.5 },
        ],
        total: 2,
        limit: null,
        offset: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await api.getOrders();

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith("/api/orders");
    });

    it("should fetch orders with product filter", async () => {
      const mockResponse: OrdersResponse = {
        orders: [{ id: 1, product: "Apple", qty: 5, price: 2.0 }],
        total: 1,
        limit: null,
        offset: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const filters: OrderFilters = { product: "Apple" };
      const result = await api.getOrders(filters);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith("/api/orders?product=Apple");
    });

    it("should fetch orders with pagination", async () => {
      const mockResponse: OrdersResponse = {
        orders: [{ id: 1, product: "Apple", qty: 5, price: 2.0 }],
        total: 10,
        limit: 1,
        offset: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const filters: OrderFilters = { limit: 1, offset: 0 };
      const result = await api.getOrders(filters);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith("/api/orders?limit=1&offset=0");
    });

    it("should fetch orders with all filters", async () => {
      const mockResponse: OrdersResponse = {
        orders: [{ id: 1, product: "Apple", qty: 5, price: 2.0 }],
        total: 1,
        limit: 10,
        offset: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const filters: OrderFilters = {
        product: "Apple",
        limit: 10,
        offset: 0,
      };
      const result = await api.getOrders(filters);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/orders?product=Apple&limit=10&offset=0"
      );
    });

    it("should handle fetch errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(api.getOrders()).rejects.toThrow("Network error");
    });

    it("should handle non-ok responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(api.getOrders()).rejects.toThrow("Failed to fetch orders");
    });

    it("should handle empty orders response", async () => {
      const mockResponse: OrdersResponse = {
        orders: [],
        total: 0,
        limit: null,
        offset: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await api.getOrders();

      expect(result).toEqual(mockResponse);
    });
  });

  describe("createOrder", () => {
    it("should create order successfully", async () => {
      const orderData: CreateOrderRequest = {
        product: "Test Product",
        qty: 5,
        price: 10.5,
      };

      const mockOrder: Order = {
        id: 1,
        ...orderData,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrder,
      } as Response);

      const result = await api.createOrder(orderData);

      expect(result).toEqual(mockOrder);
      expect(mockFetch).toHaveBeenCalledWith("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
    });

    it("should create order with zero values", async () => {
      const orderData: CreateOrderRequest = {
        product: "Free Product",
        qty: 0,
        price: 0,
      };

      const mockOrder: Order = {
        id: 1,
        ...orderData,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrder,
      } as Response);

      const result = await api.createOrder(orderData);

      expect(result).toEqual(mockOrder);
    });

    it("should create order with decimal prices", async () => {
      const orderData: CreateOrderRequest = {
        product: "Decimal Product",
        qty: 3,
        price: 12.99,
      };

      const mockOrder: Order = {
        id: 1,
        ...orderData,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrder,
      } as Response);

      const result = await api.createOrder(orderData);

      expect(result).toEqual(mockOrder);
    });

    it("should handle validation errors", async () => {
      const orderData: CreateOrderRequest = {
        product: "",
        qty: -1,
        price: -10.5,
      };

      const errorResponse = {
        error: "Validation failed",
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => errorResponse,
      } as Response);

      await expect(api.createOrder(orderData)).rejects.toThrow(
        "Validation failed"
      );
    });

    it("should handle server errors", async () => {
      const orderData: CreateOrderRequest = {
        product: "Test Product",
        qty: 5,
        price: 10.5,
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({ error: "Server error" }),
      } as any);

      await expect(api.createOrder(orderData)).rejects.toThrow("Server error");
    });

    it("should handle network errors", async () => {
      const orderData: CreateOrderRequest = {
        product: "Test Product",
        qty: 5,
        price: 10.5,
      };

      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(api.createOrder(orderData)).rejects.toThrow("Network error");
    });

    it("should handle JSON parsing errors", async () => {
      const orderData: CreateOrderRequest = {
        product: "Test Product",
        qty: 5,
        price: 10.5,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      } as Response);

      await expect(api.createOrder(orderData)).rejects.toThrow("Invalid JSON");
    });
  });

  describe("healthCheck", () => {
    it("should check health successfully", async () => {
      const mockHealth = {
        status: "OK",
        timestamp: "2023-01-01T00:00:00.000Z",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockHealth,
      } as Response);

      const result = await api.healthCheck();

      expect(result).toEqual(mockHealth);
      expect(mockFetch).toHaveBeenCalledWith("/api/health");
    });

    it("should handle health check errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(api.healthCheck()).rejects.toThrow("Network error");
    });

    it("should handle non-ok health responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(api.healthCheck()).rejects.toThrow("Health check failed");
    });
  });

  describe("URL Construction", () => {
    it("should construct URLs correctly for getOrders", async () => {
      const mockResponse: OrdersResponse = {
        orders: [],
        total: 0,
        limit: null,
        offset: 0,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      // Test different filter combinations
      await api.getOrders({ product: "Apple" });
      expect(mockFetch).toHaveBeenCalledWith("/api/orders?product=Apple");

      await api.getOrders({ limit: 10 });
      expect(mockFetch).toHaveBeenCalledWith("/api/orders?limit=10");

      await api.getOrders({ offset: 20 });
      expect(mockFetch).toHaveBeenCalledWith("/api/orders?offset=20");

      await api.getOrders({ product: "Apple", limit: 10, offset: 20 });
      expect(mockFetch).toHaveBeenCalledWith(
        "/api/orders?product=Apple&limit=10&offset=20"
      );
    });

    it("should handle special characters in product names", async () => {
      const mockResponse: OrdersResponse = {
        orders: [],
        total: 0,
        limit: null,
        offset: 0,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const specialProduct = "Product with Special Chars: !@#$%^&*()";
      await api.getOrders({ product: specialProduct });

      const params = new URLSearchParams();
      params.append("product", specialProduct);
      expect(mockFetch).toHaveBeenCalledWith(
        `/api/orders?${params.toString()}`
      );
    });

    it("should handle unicode characters in product names", async () => {
      const mockResponse: OrdersResponse = {
        orders: [],
        total: 0,
        limit: null,
        offset: 0,
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const unicodeProduct = "产品名称 🍎 🍌";
      await api.getOrders({ product: unicodeProduct });

      const params = new URLSearchParams();
      params.append("product", unicodeProduct);
      expect(mockFetch).toHaveBeenCalledWith(
        `/api/orders?${params.toString()}`
      );
    });
  });

  describe("Request Headers", () => {
    it("should set correct headers for createOrder", async () => {
      const orderData: CreateOrderRequest = {
        product: "Test Product",
        qty: 5,
        price: 10.5,
      };

      const mockOrder: Order = {
        id: 1,
        ...orderData,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockOrder,
      } as Response);

      await api.createOrder(orderData);

      expect(mockFetch).toHaveBeenCalledWith("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
    });

    it("should not set headers for GET requests", async () => {
      const mockResponse: OrdersResponse = {
        orders: [],
        total: 0,
        limit: null,
        offset: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await api.getOrders();

      expect(mockFetch).toHaveBeenCalledWith("/api/orders");
    });
  });

  describe("Error Handling", () => {
    it("should handle different error types", async () => {
      const errorTypes = [
        new Error("Network error"),
        new Error("Timeout error"),
        new Error("CORS error"),
        new Error("Unknown error"),
      ];

      for (const error of errorTypes) {
        mockFetch.mockRejectedValueOnce(error);
        await expect(api.getSummary()).rejects.toThrow(error.message);
      }
    });

    it("should handle different HTTP status codes", async () => {
      const statusCodes = [400, 401, 403, 404, 500, 502, 503];

      for (const status of statusCodes) {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status,
        } as Response);

        await expect(api.getSummary()).rejects.toThrow(
          "Failed to fetch summary"
        );
      }
    });
  });

  describe("Data Validation", () => {
    it("should handle malformed JSON responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Unexpected token");
        },
      } as Response);

      await expect(api.getSummary()).rejects.toThrow("Unexpected token");
    });

    it("should handle null responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      } as Response);

      const result = await api.getSummary();
      expect(result).toBeNull();
    });

    it("should handle undefined responses", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => undefined,
      } as Response);

      const result = await api.getSummary();
      expect(result).toBeUndefined();
    });
  });
});
