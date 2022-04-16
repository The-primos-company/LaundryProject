import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import {
  Container,
  TextField,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Button,
  Stack,
} from "@mui/material";
import { Search } from '@mui/icons-material'
import { Order } from './Order'
import { PrintOrder } from '../../components/PrintOrder/PrintOrder'
import { useReactToPrint } from "react-to-print";

const items = [
  { value: "nombreDelCliente", label: "Nombre del cliente" },
  { value: "numeroDeOrden", label: "Numero de orden" },
]



export const SearchOrder = ({ setRoute }) => {
  const [searchBy, setSearchBy] = useState("nombreDelCliente")
  const [searchValue, setSearchValue] = useState("")
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState(null);
  const [orderNumberTmp, setOrderNumberTmp] = useState(null);

  const handleChange = (event) => {
    setSearchBy(event.target.value);
  };

  const printOrder = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => printOrder.current,
  });




  const onClickByName = async () => {
    if (searchValue === "") return
    // setOrders([])
    const data = await window.go.service.OrderService.GetOrderByClientName(searchValue, 10, 0);
    setOrders(data)
    setSearchValue("")

  }
  const onClickId = async () => {
    if (searchValue === "") return
    // setOrders([])
    const data = await window.go.service.OrderService.GetOrderByIdentifier(searchValue, 10, 0);
    setOrders(data)
    setSearchValue("")

  }




  return (
    <Container>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            id="outlined-select-currency"
            select
            label="Buscar por"
            value={searchBy}
            onChange={handleChange}
            sx={{ width: '100%' }}
          >
            {items.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={9}>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel htmlFor="input-with-icon-adornment">
              Campo de texto con el valor a buscar
            </InputLabel>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              id="input-with-icon-adornment"
              onBlur={() => searchBy === 'nombreDelCliente' ? onClickByName() : onClickId()}
              endAdornment={
                <InputAdornment position="start" >
                  <Search />
                </InputAdornment>
              }
            />
            <Button onClick={() => searchBy === 'nombreDelCliente' ? onClickByName() : onClickId()}>Buscar</Button>
          </FormControl>
        </Grid>
      </Grid>
      <Stack>
        {/* Map orders */}
        {
          orders.map(order => {

            return <Order key={order.ID} order={order} setOrder={setOrder} setOrderNumberTmp={setOrderNumberTmp} handlePrint={handlePrint}/>
          })
        }
        {order && (
          <PrintOrder
            order={order}
            orderNumber={orderNumberTmp}
            componentRef={printOrder}
            handlePrint={handlePrint}
          />
        )}

      </Stack>

    </Container>
  )
}
