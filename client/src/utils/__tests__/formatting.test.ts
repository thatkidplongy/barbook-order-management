import {
  formatCurrency,
  formatNumber,
  calculateOrderTotal,
  formatOrderTotal,
  truncateText,
  capitalizeWords,
} from "../formatting";

describe("formatting utilities", () => {
  describe("formatCurrency", () => {
    it("should format positive numbers as currency", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
      expect(formatCurrency(0)).toBe("$0.00");
      expect(formatCurrency(999.99)).toBe("$999.99");
    });

    it("should format negative numbers as currency", () => {
      expect(formatCurrency(-1234.56)).toBe("-$1,234.56");
    });

    it("should handle zero", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });

    it("should handle large numbers", () => {
      expect(formatCurrency(1000000)).toBe("$1,000,000.00");
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with locale separators", () => {
      expect(formatNumber(1234567)).toBe("1,234,567");
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(999)).toBe("999");
    });

    it("should handle negative numbers", () => {
      expect(formatNumber(-1234567)).toBe("-1,234,567");
    });
  });

  describe("calculateOrderTotal", () => {
    it("should calculate total correctly", () => {
      expect(calculateOrderTotal(5, 2.5)).toBe(12.5);
      expect(calculateOrderTotal(0, 10)).toBe(0);
      expect(calculateOrderTotal(3, 0)).toBe(0);
    });

    it("should handle decimal quantities", () => {
      expect(calculateOrderTotal(2.5, 4)).toBe(10);
    });
  });

  describe("formatOrderTotal", () => {
    it("should format order total as currency", () => {
      expect(formatOrderTotal(5, 2.5)).toBe("$12.50");
      expect(formatOrderTotal(3, 1.2)).toBe("$3.60");
    });

    it("should handle zero values", () => {
      expect(formatOrderTotal(0, 10)).toBe("$0.00");
      expect(formatOrderTotal(5, 0)).toBe("$0.00");
    });
  });

  describe("truncateText", () => {
    it("should truncate text longer than max length", () => {
      expect(truncateText("This is a very long text", 10)).toBe(
        "This is a ..."
      );
      expect(truncateText("Hello World", 5)).toBe("Hello...");
    });

    it("should return original text if shorter than max length", () => {
      expect(truncateText("Short", 10)).toBe("Short");
      expect(truncateText("", 5)).toBe("");
    });

    it("should handle exact length", () => {
      expect(truncateText("Hello", 5)).toBe("Hello");
    });
  });

  describe("capitalizeWords", () => {
    it("should capitalize first letter of each word", () => {
      expect(capitalizeWords("hello world")).toBe("Hello World");
      expect(capitalizeWords("apple banana cherry")).toBe(
        "Apple Banana Cherry"
      );
    });

    it("should handle single word", () => {
      expect(capitalizeWords("hello")).toBe("Hello");
    });

    it("should handle empty string", () => {
      expect(capitalizeWords("")).toBe("");
    });

    it("should handle already capitalized words", () => {
      expect(capitalizeWords("Hello World")).toBe("Hello World");
    });

    it("should handle mixed case", () => {
      expect(capitalizeWords("hELLo WoRLd")).toBe("Hello World");
    });
  });
});
