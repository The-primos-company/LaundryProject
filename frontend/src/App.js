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
import { useState } from "react";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// End tables
const App = () => {
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [recievedDate, setRecievedDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  // Funciones a go
  function greet() {
    // Call App.Greet(name)
    var order = new Order({
      recieved_date: recievedDate,
      delivery_date: deliveryDate,
      client_name: clientName,
      client_id: clientId,
      client_address: clientAddress,
      client_phone: clientPhone,
      client_email: clientEmail,
    });

    console.log(order);

    window.go.main.App.CreateOrder(order).then((result) => {
      // Update result with data back from App.Greet()
      console.log(result);
    });
  }

  return (
    <Container>
      {/* Header */}
      <div className={styles["logo-container"]}>
        <img src={logo} alt="logo" className={styles["logo"]} />
      </div>
      <div className={styles["order-container"]}>
        <span className={styles["order-title"]}>Orden de servicio:</span>
        <Input disabled defaultValue="0001" />
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
            // value={name}
            // onChange={handleChange}
          />
        </Box>
        <Box className={styles["details-wrap"]}>
          <TextField
            id="outlined-name"
            label="Cédula"
            className={styles["input"]}
            onChange={(event) => setClientId(event.target.value)}
            // value={name}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            label="Dirección"
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
            // value={name}
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
        <PrendasComponent />
        {/* <SpanningTable /> */}
        {/* <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        /> */}
      </div>
      {/* Abono */}
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="outlined-name"
          label="Abono"
          className={styles["input"]}
          // value={name}
          // onChange={handleChange}
        />
      </Box>
      {/* Estado de la prenda */}
      <Box
        sx={{ display: "flex", justifyContent: "space-around", marginTop: 5 }}
      >
        <FormControlLabel control={<Checkbox />} label="Roto" />
        <FormControlLabel control={<Checkbox />} label="Picado" />
        <FormControlLabel control={<Checkbox />} label="Manchado" />
        <FormControlLabel control={<Checkbox />} label="Quemado" />
      </Box>

      {/* Observaciones */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <TextField
          id="outlined-multiline-flexible"
          label="Observaciones"
          multiline
          maxRows={4}
          // value={value}
          // onChange={handleChange}
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
