const OrderStatus = {
  Pending: 0,
  Created: 1,
  Completed: 3,
  Cancelled: 4,
  Refunded: 5,
  Shipped: 6,
};

const OrderStatusText = Object.fromEntries(
  Object.entries(OrderStatus).map(([key, value]) => [value, key])
);

export const getOrderStatusText = (statusNumber) => {
  return OrderStatusText[statusNumber] || "Unknown Status";
};
