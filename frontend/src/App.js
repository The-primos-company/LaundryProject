import React, { useState } from "react";
import { CreateOrder } from "./pages/CreateOrder/CreateOrder";
import { Orders } from "./pages/Orders/Orders";

export const App = () => {
  const [createOrder, setCreateOrder] = useState(true);
  console.log(createOrder);
  return createOrder ? (
    <CreateOrder createOrder={createOrder} setCreateOrder={setCreateOrder} />
  ) : (
    <Orders createOrder={createOrder} setCreateOrder={setCreateOrder} />
  );
};
