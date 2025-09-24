import {
  sortOrders,
  getNextSortConfig,
  getDefaultSortConfig,
  SortField,
  SortDirection,
} from "../sorting";
import { Order } from "../../types";

describe("sorting utilities", () => {
  const mockOrders: Order[] = [
    { id: 1, product: "Apple", qty: 5, price: 2.5 },
    { id: 2, product: "Banana", qty: 3, price: 1.2 },
    { id: 3, product: "Cherry", qty: 10, price: 0.8 },
  ];

  describe("sortOrders", () => {
    it("should sort by product name ascending", () => {
      const result = sortOrders(mockOrders, {
        field: "product",
        direction: "asc",
      });
      expect(result[0].product).toBe("Apple");
      expect(result[1].product).toBe("Banana");
      expect(result[2].product).toBe("Cherry");
    });

    it("should sort by product name descending", () => {
      const result = sortOrders(mockOrders, {
        field: "product",
        direction: "desc",
      });
      expect(result[0].product).toBe("Cherry");
      expect(result[1].product).toBe("Banana");
      expect(result[2].product).toBe("Apple");
    });

    it("should sort by quantity ascending", () => {
      const result = sortOrders(mockOrders, { field: "qty", direction: "asc" });
      expect(result[0].qty).toBe(3);
      expect(result[1].qty).toBe(5);
      expect(result[2].qty).toBe(10);
    });

    it("should sort by quantity descending", () => {
      const result = sortOrders(mockOrders, {
        field: "qty",
        direction: "desc",
      });
      expect(result[0].qty).toBe(10);
      expect(result[1].qty).toBe(5);
      expect(result[2].qty).toBe(3);
    });

    it("should sort by price ascending", () => {
      const result = sortOrders(mockOrders, {
        field: "price",
        direction: "asc",
      });
      expect(result[0].price).toBe(0.8);
      expect(result[1].price).toBe(1.2);
      expect(result[2].price).toBe(2.5);
    });

    it("should sort by total ascending", () => {
      const result = sortOrders(mockOrders, {
        field: "total",
        direction: "asc",
      });
      // Cherry: 10 * 0.80 = 8.00
      // Banana: 3 * 1.20 = 3.60
      // Apple: 5 * 2.50 = 12.50
      expect(result[0].product).toBe("Banana");
      expect(result[1].product).toBe("Cherry");
      expect(result[2].product).toBe("Apple");
    });

    it("should not mutate original array", () => {
      const original = [...mockOrders];
      sortOrders(mockOrders, { field: "product", direction: "asc" });
      expect(mockOrders).toEqual(original);
    });

    it("should handle empty array", () => {
      const result = sortOrders([], { field: "product", direction: "asc" });
      expect(result).toEqual([]);
    });
  });

  describe("getNextSortConfig", () => {
    it("should toggle direction when same field is clicked", () => {
      const result = getNextSortConfig("product", "asc", "product");
      expect(result).toEqual({ field: "product", direction: "desc" });
    });

    it("should set new field with ascending direction", () => {
      const result = getNextSortConfig("product", "desc", "qty");
      expect(result).toEqual({ field: "qty", direction: "asc" });
    });

    it("should toggle from desc to asc", () => {
      const result = getNextSortConfig("product", "desc", "product");
      expect(result).toEqual({ field: "product", direction: "asc" });
    });
  });

  describe("getDefaultSortConfig", () => {
    it("should return default sort configuration", () => {
      const result = getDefaultSortConfig();
      expect(result).toEqual({ field: "product", direction: "asc" });
    });
  });
});
