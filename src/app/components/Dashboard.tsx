import Card from "./Card";

export default function Dashboard({ orders }: { orders: Order[] }) {
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
    (order) => order.dispatch_point === "Seven Hills"
  );

  return (
    <div>
      <div>
        In this week a total of {orders.length} viare orders have been shipped
      </div>
      <div>
        {orders.length > 0 && (
          <>
            <Card orders={sevenHillsOrders} />
            <Card orders={melbourneOrdes} />
            <Card orders={ringwoodOrders} />
            <Card orders={canberraOrders} />
            <Card orders={perthOrders} />
            <Card orders={fortitudeValleyOrders} />
            <Card orders={hobartOrders} />
            <Card orders={sydneyOrders} />
          </>
        )}
      </div>
    </div>
  );
}
