import React, { useContext } from "react";

import { RouterContext } from "../context/RouterContext";
import { AuthProvider } from "../context/AuthContext";

import { CreateOrder } from "./CreateOrder/CreateOrder";
import { Orders } from "./Orders/Orders";
import { SearchOrder } from "./SearchOrder/SearchOrder";
import { GarmentsPrices } from "./GarmentsPrices/GarmentsPrices";
import { Clients } from "./Clients/Clients";
import { Results } from "./Results/Results";
import { Login } from "./Login/Login";

export const HomePage = () => {
  const { route } = useContext(RouterContext);

  switch (route) {
    case "create-order":
      return (
        <AuthProvider>
          <CreateOrder />
        </AuthProvider>
      );
    case "orders":
      return (
        <AuthProvider>
         <Orders />
        </AuthProvider>
      );
    case "search-order":
      return (
        <AuthProvider>
         <SearchOrder />
        </AuthProvider>
      );
    case "garments-prices":
      return (
        <AuthProvider>
          <GarmentsPrices />
        </AuthProvider>
      );
    case "clients":
      return (
        <AuthProvider>
         <Clients />
        </AuthProvider>
      );
    case "results":
      return (
        <AuthProvider>
        <Results />
        </AuthProvider>
      );
    case "login":
      return (
        <AuthProvider>
        <Login />
        </AuthProvider>
      );
    default:
      return (
        <AuthProvider>
         <Login />
        </AuthProvider>
      );
  }
};
