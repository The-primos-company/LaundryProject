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

// Funciones a go
function greet(clientName) {
  // Call App.Greet(name)
  let order = new Order({
    recieved_date: Date.now().toLocaleString,
    delivery_date: Date.now().toLocaleString,
    client_name: clientName,
    client_id: "123214123",
    client_address: "avenida siempre viva",
    client_phone: "41123123",
    client_email: "gokusita.lamejor@correo.com",
  });
  window.go.main.App.CreateOrder(order).then((result) => {
    // Update result with data back from App.Greet()
    console.log(result);
  });
}

function handleSubmit(clientName) {
  greet(clientName);
}

// End tables
const App = () => {
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  console.log(clientName);
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
            label="Dirección"
            className={styles["input"]}
            sx={{ marginTop: 3, marginBottom: 3 }}
            // value={name}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            label="Teléfono"
            className={styles["input"]}
            // value={name}
            // onChange={handleChange}
          />
        </Box>
        <div className={styles["details-wrap"]}>
          <TextField
            id="outlined-name"
            label="Fecha de recibido"
            className={styles["input"]}
            sx={{ marginBottom: 3 }}
            // value={name}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            label="Fecha de entrega"
            className={styles["input"]}
            // value={name}
            // onChange={handleChange}
          />
        </div>
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
        <Button variant="text" onClick={handleSubmit}>
          Generar orden
        </Button>
      </Box>
    </Container>
  );
};

export default App;
