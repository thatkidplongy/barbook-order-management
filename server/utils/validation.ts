export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates order creation request
 */
export function validateCreateOrderRequest(data: any): ValidationResult {
  const errors: string[] = [];

  // Product validation
  if (
    !data.product ||
    typeof data.product !== "string" ||
    data.product.trim() === ""
  ) {
    errors.push("Product is required and must be a non-empty string");
  }

  // Quantity validation
  if (
    !data.qty ||
    typeof data.qty !== "number" ||
    data.qty < 0 ||
    !Number.isInteger(data.qty)
  ) {
    errors.push("Quantity is required and must be a non-negative integer");
  }

  // Price validation
  if (!data.price || typeof data.price !== "number" || data.price < 0) {
    errors.push("Price is required and must be a non-negative number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates query parameters for orders endpoint
 */
export function validateOrderFilters(query: any): ValidationResult {
  const errors: string[] = [];

  if (query.limit && (isNaN(Number(query.limit)) || Number(query.limit) < 1)) {
    errors.push("Limit must be a positive number");
  }

  if (
    query.offset &&
    (isNaN(Number(query.offset)) || Number(query.offset) < 0)
  ) {
    errors.push("Offset must be a non-negative number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitizes string input
 */
export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}
