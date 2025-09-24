import { CreateOrderRequest } from "../types";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates order form data
 */
export function validateOrderForm(data: CreateOrderRequest): ValidationResult {
  const errors: string[] = [];

  // Product validation
  if (
    !data.product ||
    typeof data.product !== "string" ||
    data.product.trim() === ""
  ) {
    errors.push("Product name is required");
  } else if (data.product.trim().length < 2) {
    errors.push("Product name must be at least 2 characters long");
  }

  // Quantity validation
  if (
    data.qty === undefined ||
    data.qty === null ||
    typeof data.qty !== "number"
  ) {
    errors.push("Quantity is required");
  } else if (!Number.isInteger(data.qty)) {
    errors.push("Quantity must be a whole number");
  } else if (data.qty < 1) {
    errors.push("Quantity must be at least 1");
  } else if (data.qty > 10000) {
    errors.push("Quantity cannot exceed 10,000");
  }

  // Price validation
  if (!data.price || typeof data.price !== "number") {
    errors.push("Price is required");
  } else if (data.price < 0) {
    errors.push("Price cannot be negative");
  } else if (data.price > 1000000) {
    errors.push("Price cannot exceed $1,000,000");
  } else if (data.price !== Math.round(data.price * 100) / 100) {
    errors.push("Price cannot have more than 2 decimal places");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates search filter input
 */
export function validateSearchFilter(filter: string): ValidationResult {
  const errors: string[] = [];

  if (filter.length > 100) {
    errors.push("Search term cannot exceed 100 characters");
  }

  // Check for potentially harmful characters
  const dangerousPatterns = /[<>'"&]/;
  if (dangerousPatterns.test(filter)) {
    errors.push("Search term contains invalid characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitizes input text by trimming and removing extra spaces
 */
export function sanitizeText(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/**
 * Validates pagination parameters
 */
export function validatePagination(
  page: number,
  totalPages: number
): ValidationResult {
  const errors: string[] = [];

  if (!Number.isInteger(page) || page < 1) {
    errors.push("Page number must be a positive integer");
  }

  if (totalPages === 0) {
    errors.push("No pages available");
  } else if (page > totalPages) {
    errors.push("Page number exceeds total pages");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
