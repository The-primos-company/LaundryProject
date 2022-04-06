import React, { useContext } from 'react'

import { RouterContext } from '../context/RouterContext'

import { CreateOrder } from './CreateOrder/CreateOrder'
import { Orders } from './Orders/Orders'
import { SearchOrder } from './SearchOrder/SearchOrder'

export const HomePage = () => {
  const { route } = useContext(RouterContext)

  console.log(route);

  switch (route) {
    case "create-order":
      return <CreateOrder />
    case "orders":
      return <Orders />
    case "search-order":
      return <SearchOrder />
    default:
      return <SearchOrder />
  }
}
