import {
  validateOrderForm,
  validateSearchFilter,
  sanitizeText,
  validatePagination,
} from "../validation";
import { CreateOrderRequest } from "../../types";

describe("validation utilities", () => {
  describe("validateOrderForm", () => {
    const validOrder: CreateOrderRequest = {
      product: "Apple",
      qty: 5,
      price: 2.5,
    };

    it("should validate correct order data", () => {
      const result = validateOrderForm(validOrder);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject empty product name", () => {
      const result = validateOrderForm({ ...validOrder, product: "" });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Product name is required");
    });

    it("should reject product name with only spaces", () => {
      const result = validateOrderForm({ ...validOrder, product: "   " });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Product name is required");
    });

    it("should reject product name too short", () => {
      const result = validateOrderForm({ ...validOrder, product: "A" });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Product name must be at least 2 characters long"
      );
    });

    it("should reject invalid quantity", () => {
      const result = validateOrderForm({ ...validOrder, qty: 0 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Quantity must be at least 1");
    });

    it("should reject negative quantity", () => {
      const result = validateOrderForm({ ...validOrder, qty: -1 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Quantity must be at least 1");
    });

    it("should reject non-integer quantity", () => {
      const result = validateOrderForm({ ...validOrder, qty: 5.5 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Quantity must be a whole number");
    });

    it("should reject quantity too large", () => {
      const result = validateOrderForm({ ...validOrder, qty: 10001 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Quantity cannot exceed 10,000");
    });

    it("should reject negative price", () => {
      const result = validateOrderForm({ ...validOrder, price: -1 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Price cannot be negative");
    });

    it("should reject price too large", () => {
      const result = validateOrderForm({ ...validOrder, price: 1000001 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Price cannot exceed $1,000,000");
    });

    it("should reject price with too many decimal places", () => {
      const result = validateOrderForm({ ...validOrder, price: 2.555 });
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Price cannot have more than 2 decimal places"
      );
    });

    it("should accept valid decimal price", () => {
      const result = validateOrderForm({ ...validOrder, price: 2.55 });
      expect(result.isValid).toBe(true);
    });

    it("should collect multiple errors", () => {
      const result = validateOrderForm({ product: "", qty: -1, price: -1 });
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  describe("validateSearchFilter", () => {
    it("should validate correct search filter", () => {
      const result = validateSearchFilter("apple");
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject search filter too long", () => {
      const longFilter = "a".repeat(101);
      const result = validateSearchFilter(longFilter);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Search term cannot exceed 100 characters"
      );
    });

    it("should reject search filter with dangerous characters", () => {
      const result = validateSearchFilter("apple<script>");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Search term contains invalid characters"
      );
    });

    it("should accept empty search filter", () => {
      const result = validateSearchFilter("");
      expect(result.isValid).toBe(true);
    });
  });

  describe("sanitizeText", () => {
    it("should trim whitespace", () => {
      expect(sanitizeText("  hello  ")).toBe("hello");
    });

    it("should replace multiple spaces with single space", () => {
      expect(sanitizeText("hello    world")).toBe("hello world");
    });

    it("should handle tabs and newlines", () => {
      expect(sanitizeText("hello\t\nworld")).toBe("hello world");
    });

    it("should handle empty string", () => {
      expect(sanitizeText("")).toBe("");
    });
  });

  describe("validatePagination", () => {
    it("should validate correct pagination", () => {
      const result = validatePagination(1, 5);
      expect(result.isValid).toBe(true);
    });

    it("should reject invalid page number", () => {
      const result = validatePagination(0, 5);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Page number must be a positive integer");
    });

    it("should reject page number exceeding total pages", () => {
      const result = validatePagination(6, 5);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Page number exceeds total pages");
    });

    it("should accept page number equal to total pages", () => {
      const result = validatePagination(5, 5);
      expect(result.isValid).toBe(true);
    });

    it("should handle zero total pages", () => {
      const result = validatePagination(1, 0);
      expect(result.isValid).toBe(false);
    });
  });
});
