import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeIcon from '@mui/icons-material/Badge';
const CardComponent = (
  { order, setOrder, setOrderNumberTmp, handlePrint }
) => {

  const onClickId = async (id) => {
    // setOrders([])
    const data = await window.go.service.OrderService.GetOrderByIdentifier(id, 10, 0);
    setOrder(data[0])
    setOrderNumberTmp(id)
    handlePrint()

  }

  return (<React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Numero de la orden: <strong>{order.identifier}</strong>
      </Typography>
      <Typography variant="h5" component="div">
        Nombre del cliente: <strong>{order.client_name}</strong>
      </Typography>
      <Typography color="text.secondary">
        Cedula: <strong>{order.client_id}</strong>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.terceary">
        Celular: <strong>{order.client_phone}</strong>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.terceary">
        Total: <strong>{order.payment_total}</strong>
        <br />
        Abono: <strong>{order.payment_total_payed}</strong>
        <br />
        Saldo: <strong>{order.payment_total_real}</strong>
      </Typography>
      <Typography variant="body2">

        Fecha de recibido: <strong>{moment(order.recieved_date).format("MMMM D YYYY, h:mm a")}</strong>
        <br />
        Fecha de entrega: <strong>{moment(order.delivery_date).format("MMMM D YYYY, h:mm a")}</strong>
        <br />
        Total prendas: <strong>{order.garment_total}</strong>
        <br />
      </Typography>
      {order.garments.map(garment => {
        return (
          <Typography variant="body2">
            <strong>{garment.cuantity} {garment.category} {garment.brand}</strong>
          </Typography>
        )
      })}
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => onClickId(order.identifier)}>Imprimir</Button>
    </CardActions>
  </React.Fragment>)
}

export const Order = ({ order, setOrder, setOrderNumberTmp,handlePrint }) => {
  return (
    <Box sx={{ minWidth: 275, marginBottom: 2 }} >
      <Card variant="outlined"><CardComponent order={order} setOrder={setOrder} setOrderNumberTmp={setOrderNumberTmp} handlePrint={handlePrint}/></Card>
    </Box>
  );
}