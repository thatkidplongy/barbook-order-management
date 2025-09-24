/**
 * Formats currency values with proper locale formatting
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats numbers with locale-specific separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Formats order total calculation
 */
export function calculateOrderTotal(qty: number, price: number): number {
  return qty * price;
}

/**
 * Formats order total as currency
 */
export function formatOrderTotal(qty: number, price: number): string {
  return formatCurrency(calculateOrderTotal(qty, price));
}

/**
 * Truncates text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Capitalizes the first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
