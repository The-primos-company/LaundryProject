import React, { useContext } from 'react'
import { Button } from "@mui/material";

import { RouterContext } from '../context/RouterContext'

export const Navbar = () => {
  const { setRoute } = useContext(RouterContext)

  return (
    <>
      <Button onClick={() => setRoute("create-order")} >Crear orden</Button>
      <Button onClick={() => setRoute("orders")}>Ver ordenes</Button>
      <Button onClick={() => setRoute("search-order")}>Buscar orden</Button>
      <Button onClick={() => setRoute("garments-prices")}>Prendas y precios</Button>
    </>
  )
}
