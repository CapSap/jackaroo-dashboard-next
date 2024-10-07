import { Order } from "@/types/types";

export default function Card({ orders }: { orders: Order[] }) {
  const title = orders[0].dispatch_point;

  const expressOrders = orders.filter((order) => order.freight === 15);

  const cncOrders = orders.filter(
    (order) => order.shipped_to === "Paddy Pallin Sydney CBD"
  );

  const cncOrdersPostedOut = orders.filter(
    (order) =>
      order.shipped_to &&
      new RegExp(`Paddy Pallin(?!.*${title})`).test(order.shipped_to)
  );

  const regOrderCount =
    orders.length - (expressOrders.length + cncOrders.length);

  return (
    <div className="card">
      <h3>{title} </h3>
      <ul>
        <li>Total viare orders processed: {orders.length}</li>
        <li>Express shipments: {expressOrders.length}</li>
        <li>Regular shipments: {regOrderCount}</li>
        <li>CNCs posted out: {cncOrdersPostedOut.length}</li>
        <li>
          CNCs to be collected from {title}: {cncOrders.length}
        </li>
      </ul>
    </div>
  );
}
