import React, { useContext } from 'react'

import { RouterContext } from '../context/RouterContext'

import { CreateOrder } from './CreateOrder/CreateOrder'
import { Orders } from './Orders/Orders'
import { SearchOrder } from './SearchOrder/SearchOrder'
import { GarmentsPrices } from './GarmentsPrices/GarmentsPrices'

export const HomePage = () => {
  const { route } = useContext(RouterContext)

  switch (route) {
    case "create-order":
      return <CreateOrder />
    case "orders":
      return <Orders />
    case "search-order":
      return <SearchOrder />
    case "garments-prices":
      return <GarmentsPrices />
    default:
      return <CreateOrder />
  }
}
