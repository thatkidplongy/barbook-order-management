/**
 * Application constants
 */

export const PAGINATION = {
  DEFAULT_ITEMS_PER_PAGE: 10,
  MAX_ITEMS_PER_PAGE: 100,
  MIN_PAGE: 1,
} as const;

export const VALIDATION_LIMITS = {
  MAX_PRODUCT_LENGTH: 100,
  MIN_PRODUCT_LENGTH: 2,
  MAX_QUANTITY: 10000,
  MIN_QUANTITY: 1,
  MAX_PRICE: 1000000,
  MAX_SEARCH_LENGTH: 100,
} as const;

export const UI_CONSTANTS = {
  SMOOTH_LOADING_DURATION: 600,
  SUMMARY_LOADING_DURATION: 500,
  DEBOUNCE_DELAY: 300,
} as const;

export const SORT_FIELDS = {
  PRODUCT: "product",
  QUANTITY: "qty",
  PRICE: "price",
  TOTAL: "total",
} as const;

export const SORT_DIRECTIONS = {
  ASCENDING: "asc",
  DESCENDING: "desc",
} as const;
