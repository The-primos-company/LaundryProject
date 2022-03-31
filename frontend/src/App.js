import styles from "./App.module.css";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import logo from "./logo.svg";
import PrendasComponent from "./components/PrendasComponent";
import { Box } from "@mui/system";
import { Order } from "./wailsjs/go/models";
import { useEffect, useState } from "react";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// End tables
const App = () => {
  // client
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [paymentTotalPayed, setPaymentTotalPayed] = useState(0);
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [recievedDate, setRecievedDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [orderNumber, setOrderNumber] = useState(null);
  const [garmentTotal, setGarmentTotal] = useState(0);
  const [paymentTotal, setPaymentTotal] = useState(0);
  const [garments, setGarments] = useState([]);

  // prendas
  // order_id: number[];
  // total: string;
  // category: string;
  // gendre: string;
  // color: string;
  // brand: string;
  // price: string;
  // comment: string;
  // defects: string;

  // Funciones a go
  const greet = async () => {
    // Call App.Greet(name)
    let tmpGarments = garments.map((item) => {
      delete item.realPrice;
      return {
        ...item,
        defects: item.defects.join("-"),
      };
    });

    var order = new Order({
      recieved_date: recievedDate,
      delivery_date: deliveryDate,
      client_name: clientName,
      client_id: clientId,
      client_address: clientAddress,
      client_phone: clientPhone,
      client_email: clientEmail,
      payment_total_payed: paymentTotalPayed.toString(),
      garment_total: garmentTotal,
      payment_total: paymentTotal.toString(),
      garments: tmpGarments,
    });

    //Clear
    setClientName("");
    setClientId("");
    setClientAddress("");
    setClientPhone("");
    setClientEmail("");
    setPaymentTotalPayed("");
    setRecievedDate(new Date());
    setDeliveryDate(new Date());
    setOrderNumber(orderNumber + 1);

    console.log(order);

    await window.go.main.App.CreateOrder(order);
  };

  // TODO: cambiar si se va a wails
  useEffect(() => {
    const getOrderCount = async () => {
      const data = await window.go.main.App.GetNextOrderIdentifier();
      setOrderNumber(("0000" + data).substr(-4, 4));
    };

    getOrderCount();
  }, [orderNumber]);

  return (
    <Container>
      {/* Header */}
      <div className={styles["logo-container"]}>
        <img src={logo} alt="logo" className={styles["logo"]} />
      </div>
      <div className={styles["order-container"]}>
        <span className={styles["order-title"]}>Orden de servicio:</span>
        <span>{orderNumber}</span>
      </div>
      {/* Details */}
      <Box
        sx={{ marginTop: 5, marginBottom: 5 }}
        className={styles["details-container"]}
      >
        <Box className={styles["details-wrap"]}>
          <TextField
            id="outlined-name"
            label="Cliente"
            className={styles["input"]}
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            // value={name}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            label="Email"
            className={styles["input"]}
            sx={{ marginTop: 3 }}
            onChange={(event) => setClientEmail(event.target.value)}
            value={clientEmail}
            // onChange={handleChange}
          />
        </Box>
        <Box className={styles["details-wrap"]}>
          <TextField
            id="outlined-name"
            label="Cédula"
            className={styles["input"]}
            onChange={(event) => setClientId(event.target.value)}
            value={clientId}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            label="Dirección"
            value={clientAddress}
            className={styles["input"]}
            sx={{ marginTop: 3, marginBottom: 3 }}
            onChange={(event) => setClientAddress(event.target.value)}
            // value={name}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            label="Teléfono"
            className={styles["input"]}
            onChange={(event) => setClientPhone(event.target.value)}
            value={clientPhone}
            // onChange={handleChange}
          />
        </Box>
        <Box className={styles["details-wrap"]}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} sx={{ marginTop: 3, marginBottom: 3 }} />
              )}
              label="Fecha de recibido"
              value={recievedDate}
              onChange={(value) => {
                setRecievedDate(value.toISOString());
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Fecha de entrega"
              value={deliveryDate}
              onChange={(value) => {
                setDeliveryDate(value.toISOString());
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      {/* Prendas */}
      <div style={{ height: 300, width: "100%", marginBottom: 60 }}>
        <PrendasComponent setGarments={setGarments} />
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <span>Total prendas</span>
          <strong style={{ marginLeft: 5 }}>{garments.length}</strong>
        </Box>
        <Box>
          <span>Total</span>
          <strong style={{ marginLeft: 5 }}>0</strong>
        </Box>
      </Box>
      {/* Abono */}
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="outlined-name"
          label="Abono"
          className={styles["input"]}
          value={paymentTotalPayed}
          onChange={(event) => setPaymentTotalPayed(event.target.value)}
        />
      </Box>

      {/* Generar orden */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Button variant="text" onClick={greet}>
          Generar orden
        </Button>
      </Box>
    </Container>
  );
};

export default App;
