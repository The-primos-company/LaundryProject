import { Button, Container } from "@mui/material";
import React from "react";

export const Orders = ({ createOrder, setCreateOrder }) => {
  const getOrder = async () => {
    const orderList = await window.go.main.App.GetOrdersList();
    console.log(orderList);
  };
  getOrder();
  return (
    <Container>
      <Button onClick={() => setCreateOrder(!createOrder)}>Ver ordenes</Button>
    </Container>
  );
};
