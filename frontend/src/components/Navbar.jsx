import React, { useContext } from 'react'
import { Button } from "@mui/material";

import { RouterContext } from '../context/RouterContext'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const { setRoute } = useContext(RouterContext)
  const { auth, setAuth } = useContext(AuthContext)
  const handleLogout = () => {
    setAuth({
      ...auth,
      role: "",
      user: "",
      isLogged: false,
    });
    setRoute("login")
  }
  if (auth.role === 'admin') {
    return (
      <>
        <Button onClick={() => setRoute("create-order")} >Crear orden</Button>
        <Button onClick={() => setRoute("orders")}>Ver ordenes</Button>
        <Button onClick={() => setRoute("search-order")}>Buscar orden</Button>
        <Button onClick={() => setRoute("garments-prices")}>Prendas y precios</Button>
        <Button onClick={() => setRoute("clients")}>Clientes</Button>
        <Button onClick={() => setRoute("results")}>Resultados</Button>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </>
    )
  } else{
    return (
      <>
        <Button onClick={() => setRoute("create-order")} >Crear orden</Button>
        <Button onClick={() => setRoute("search-order")}>Buscar orden</Button>
        <Button onClick={() => setRoute("clients")}>Clientes</Button>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
        {/*<Button onClick={() => setRoute("orders")}>Ver ordenes</Button>
        <Button onClick={() => setRoute("garments-prices")}>Prendas y precios</Button>
        <Button onClick={() => setRoute("results")}>Resultados</Button> */}
      </>
    )
  }

  
}
