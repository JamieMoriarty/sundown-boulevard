const ordersKey = "SUNDOWN_B_FOOD_ORDERS";

export const saveOrder = (order) => {
  const storedOrders = JSON.parse(localStorage.getItem(ordersKey));

  const updatedOrders = { ...(storedOrders || {}), [order.details.email]: order };
  console.log("updatedOrders", updatedOrders);

  localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
};
