import { Button, Container } from "@mui/material";
import React from "react";

export const Orders = (createOrder, setCreateOrder) => {
  return (
    <Container>
      <Button onClick={() => setCreateOrder(!createOrder)}>Ver ordenes</Button>
      <h1>Order</h1>
    </Container>
  );
};
