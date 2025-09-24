import { Order, Summary } from "./types";

export function summarizeOrders(orders: Order[]): Summary {
  if (orders.length === 0) {
    return {
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: "",
      uniqueProductCount: 0,
    };
  }

  // Calculate total revenue
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.qty * order.price,
    0
  );

  // Calculate median order price
  const orderPrices = orders
    .map((order) => order.qty * order.price)
    .sort((a, b) => a - b);
  const medianOrderPrice =
    orderPrices.length % 2 === 0
      ? (orderPrices[orderPrices.length / 2 - 1] +
          orderPrices[orderPrices.length / 2]) /
        2
      : orderPrices[Math.floor(orderPrices.length / 2)];

  // Find top product by quantity
  const productQuantities = orders.reduce((acc, order) => {
    acc[order.product] = (acc[order.product] || 0) + order.qty;
    return acc;
  }, {} as Record<string, number>);

  const topProductByQty = Object.entries(productQuantities).reduce(
    (max, [product, qty]) => (qty > max.qty ? { product, qty } : max),
    { product: "", qty: 0 }
  ).product;

  // Count unique products
  const uniqueProductCount = new Set(orders.map((order) => order.product)).size;

  return {
    totalRevenue,
    medianOrderPrice,
    topProductByQty,
    uniqueProductCount,
  };
}
