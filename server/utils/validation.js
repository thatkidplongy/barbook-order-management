/**
 * Validates order creation request
 */
function validateCreateOrderRequest(data) {
  const errors = [];

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
function validateOrderFilters(query) {
  const errors = [];

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
function sanitizeString(input) {
  return input.trim().replace(/\s+/g, " ");
}

module.exports = {
  validateCreateOrderRequest,
  validateOrderFilters,
  sanitizeString,
};
