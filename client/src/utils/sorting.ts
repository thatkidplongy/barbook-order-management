import { Order } from "../types";

export type SortField = "id" | "product" | "qty" | "price" | "total";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

/**
 * Sorts orders based on the specified field and direction
 */
export function sortOrders(orders: Order[], config: SortConfig): Order[] {
  return [...orders].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (config.field) {
      case "id":
        aValue = a.id;
        bValue = b.id;
        break;
      case "product":
        aValue = a.product.toLowerCase();
        bValue = b.product.toLowerCase();
        break;
      case "qty":
        aValue = a.qty;
        bValue = b.qty;
        break;
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "total":
        aValue = a.qty * a.price;
        bValue = b.qty * b.price;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return config.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return config.direction === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Toggles sort direction or sets new field
 */
export function getNextSortConfig(
  currentField: SortField,
  currentDirection: SortDirection,
  newField: SortField
): SortConfig {
  if (currentField === newField) {
    return {
      field: newField,
      direction: currentDirection === "asc" ? "desc" : "asc",
    };
  }

  return {
    field: newField,
    direction: "asc",
  };
}

/**
 * Gets the default sort configuration
 */
export function getDefaultSortConfig(): SortConfig {
  return {
    field: "product",
    direction: "asc",
  };
}
