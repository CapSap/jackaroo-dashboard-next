"use client";

import Card from "./Card";

export default function Dashboard({ orders }: { orders: Order[] }) {
  console.log(orders);

  const sydneyOrders = orders.filter(
    (order) => order.dispatch_point === "Sydney"
  );
  const melbourneOrdes = orders.filter(
    (order) => order.dispatch_point === "Melbourne"
  );

  const canberraOrders = orders.filter(
    (order) => order.dispatch_point === "Canberra"
  );

  const fortitudeValleyOrders = orders.filter(
    (order) => order.dispatch_point === "Fortitude Valley"
  );

  const perthOrders = orders.filter(
    (order) => order.dispatch_point === "Perth"
  );

  const ringwoodOrders = orders.filter(
    (order) => order.dispatch_point === "Ringwood"
  );

  const hobartOrders = orders.filter(
    (order) => order.dispatch_point === "Hobart"
  );

  const sevenHillsOrders = orders.filter(
    (order) => order.dispatch_point === "Sydney"
  );

  return (
    <div>
      dashy
      <div>In this week a total of {orders.length} orders have been placed</div>
      <Card />
    </div>
  );
}
