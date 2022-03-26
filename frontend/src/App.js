import React from "react";
import styles from "./App.module.css";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import logo from "./logo.svg";
import PrendasComponent from "./components/PrendasComponent";
import { Box } from "@mui/system";

// Tables
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "type", headerName: "Tipo", width: 130 },
  { field: "genre", headerName: "Genero", width: 130 },
  { field: "color", headerName: "Color", width: 130 },
  { field: "brand", headerName: "Marca", width: 130 },
  { field: "price", headerName: "Precio", width: 130 },
];

const rows = [
  { id: 1, type: "Snow", genre: "Jon", color: 35, brand: 5, price: 1500 },
  { id: 2, type: "Snow", genre: "Jon", color: 35, brand: 5, price: 1500 },
];

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, cantidad, tipo, genero, color, marca, realPrice) {
  const totalPrice = priceRow(cantidad, realPrice);

  return { id, cantidad, tipo, genero, color, marca, precio: totalPrice };
}

function subtotal(items) {
  return items.map(({ precio }) => precio).reduce((sum, i) => sum + i, 0);
}

function sumItems(items) {
  return items.map(({ cantidad }) => cantidad).reduce((sum, i) => sum + i, 0);
}

const rows1 = [
  createRow(1, 2, "pantalon", "caballero", "azul", "Hugo Bross", 14000),
  createRow(2, 1, "pantalon", "caballero", "gris", "Hugo Bross", 14000),
];

const total = subtotal(rows1);
const sumOfItems = sumItems(rows1);

// End tables
const App = () => {
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
        <Button variant="text">Generar orden</Button>
      </Box>
    </Container>
  );
};

function SpanningTable() {
  return (
    <TableContainer component={Paper} sx={{ marginBottom: 5 }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Genero</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Marca</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* id,cantidad, tipo, genero, color, marca, precio */}
          {rows1.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.cantidad}</TableCell>
              <TableCell align="right">{row.tipo}</TableCell>
              <TableCell align="right">{row.genero}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.marca}</TableCell>
              <TableCell align="right">{row.precio}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={5}>{sumOfItems}</TableCell>
            <TableCell align="right">
              <strong>Total prendas</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}>
              <strong>Total a pagar</strong>
            </TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
