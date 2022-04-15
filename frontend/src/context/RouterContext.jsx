import { createContext } from "react";
import {useRouter } from "../hooks/useRouter";

export const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const { route,setRoute } = useRouter();
  return (
    <RouterContext.Provider value={{ route,setRoute  }}>
      {children}
    </RouterContext.Provider>
  );
};