import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import moment from "moment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
const CardComponent = ({
  order,
  setOrder,
  setOrderNumberTmp,
  handlePrint,
  setRefreshSeeOrders,
}) => {
  const [entregar, setEntregar] = React.useState(new Date());
  const [pagar, setPagar] = React.useState(new Date());
  const [inputState, setInputState] = React.useState(false);
  const onClickId = async (id) => {
    // setOrders([])
    const data = await window.go.service.OrderService.GetOrderByIdentifier(
      id,
      10,
      0
    );
    setOrder(data[0]);
    setOrderNumberTmp(id);
    handlePrint();
  };


  const handleEntregar = async (id) => {
    try {
      await window.go.service.OrderService.SetOrderDateAt(
        id,
        entregar,
        "delivered_at"
      );
      setRefreshSeeOrders(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePagar = async (id) => {
    try {
      await window.go.service.OrderService.SetOrderDateAt(
        id,
        pagar,
        "payed_at"
      );
      setRefreshSeeOrders(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
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
          Fecha de recibido:{" "}
          <strong>
            {moment(order.recieved_date).format("MMMM D YYYY, h:mm a")}
          </strong>
          <br />
          Fecha de entrega:{" "}
          <strong>
            {moment(order.delivery_date).format("MMMM D YYYY, h:mm a")}
          </strong>
          <br />
          Total prendas: <strong>{order.garment_total}</strong>
          <br />
        </Typography>
        {order.garments.map((garment) => {
          return (
            <Typography variant="body2">
              <strong>
                {garment.cuantity} {garment.category} {garment.brand}
              </strong>
            </Typography>
          );
        })}
      </CardContent>
      <Stack direction="row" justifyContent="space-around">
        <Stack>
          <Button
            size="small"
            disabled={order.delivered_at}
            onClick={() => handleEntregar(order.ID)}
          >
            {!order.delivered_at ? "Entregar" : "Entregado el:"}
          </Button>
          {!order.delivered_at ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={entregar}
                disabled={order.delivered_at}
                onChange={(value) => {
                  setEntregar(value.toISOString());
                }}
                renderInput={(props) => (
                  <TextField required {...props} sx={{ marginBottom: 3 }} />
                )}
              />
            </LocalizationProvider>
          ) : (
            <strong>
              {moment(order.delivered_at).format("MMMM D YYYY, h:mm a")}
            </strong>
          )}
        </Stack>
        <Stack>
          <Button
            size="small"
            disabled={order.payed_at}
            onClick={() => handlePagar(order.ID)}
          >
            {!order.payed_at ? "Pagar" : "Pagado el:"}
          </Button>
          {!order.payed_at ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={pagar}
                disabled={order.payed_at}
                onChange={(value) => {
                  setPagar(value.toISOString());
                }}
                renderInput={(props) => (
                  <TextField required {...props} sx={{ marginBottom: 3 }} />
                )}
              />
            </LocalizationProvider>
          ) : (
            <strong>
              {moment(order.payed_at).format("MMMM D YYYY, h:mm a")}
            </strong>
          )}
        </Stack>
      </Stack>
      <CardActions>
        <Button
          size="large"
          fullWidth={true}
          onClick={() => onClickId(order.identifier)}
        >
          Imprimir
        </Button>
      </CardActions>
    </React.Fragment>
  );
};

export const Order = ({ order, setOrder, setOrderNumberTmp, handlePrint,setRefreshSeeOrders }) => {
  return (
    <Box sx={{ width: "100%", marginBottom: 2, bgcolor: "background.paper" }}>
      {/* <Box sx={{ minWidth: 275, marginBottom: 2 }}> */}
      <Card variant="outlined">
        <CardComponent
          order={order}
          setOrder={setOrder}
          setOrderNumberTmp={setOrderNumberTmp}
          handlePrint={handlePrint}
          setRefreshSeeOrders={setRefreshSeeOrders}
        />
      </Card>
      {/* </Box> */}
    </Box>
  );
};
