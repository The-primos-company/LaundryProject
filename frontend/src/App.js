import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CreateOrder } from "./pages/CreateOrder/CreateOrder";
import { Orders } from "./pages/Orders/Orders";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateOrder />} />
        <Route path="/order" element={<Orders />} />

        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
