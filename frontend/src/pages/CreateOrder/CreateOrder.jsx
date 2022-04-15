import  {Navbar} from '../../components/Navbar'
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, Button, Container, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrendasComponent from "../../components/PrendasComponent";
import { PrintOrder } from "../../components/PrintOrder/PrintOrder";
import { Order } from "../../wailsjs/go/models";

import styles from "./CreateOrder.module.css";
import logo from "../../assets/images/logo.jpeg";

export const CreateOrder = () => {
  // client
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");
  const [paymentTotalPayed, setPaymentTotalPayed] = useState(0);
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [recievedDate, setRecievedDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderNumberTmp, setOrderNumberTmp] = useState(null);
  const [garments, setGarments] = useState([]);
  const [error, setError] = useState({
    email: "",
    deliveryDate: "",
  });
  const [order, setOrder] = useState(null);
  const [updateTotal, setUpdateTotal] = useState(false);

  let totalPrice = garments
    .map((item) => item.realTotal)
    .reduce((prev, curr) => prev + curr, 0);

  let totalGarments = garments
    .map((item) => parseInt(item.cuantity))
    .reduce((prev, curr) => prev + curr, 0);

  // print
  const printOrder = useRef();
  const handlePrint = useReactToPrint({
    content: () => printOrder.current,
  });

  // Funciones a go
  const greet = async () => {
    // const [clientName, setClientName] = useState("");
    // const [clientId, setClientId] = useState("");
    // const [paymentTotalPayed, setPaymentTotalPayed] = useState(0);
    // const [clientAddress, setClientAddress] = useState("");
    // const [clientPhone, setClientPhone] = useState("");
    // const [clientEmail, setClientEmail] = useState("");
    // const [recievedDate, setRecievedDate] = useState(new Date());
    // const [deliveryDate, setDeliveryDate] = useState(null);
    // const [orderNumber, setOrderNumber] = useState(null);
    // const [garments, setGarments] = useState([]);
    if (
      //error.email !== "" ||
      clientName === "" ||
      //clientId === "" ||
      //clientAddress === "" ||
      //clientPhone === "" ||
      deliveryDate === null
    )
      return;
    setUpdateTotal(true);
    let tmpGarments = garments.map((item) => {
      delete item.realPrice;
      return {
        ...item,
        defects: item.defects.join("-"),
        cuantity: item.cuantity.toString(),
        price: item.price.toString(),
      };
    });

    if (totalPrice === 0) {
      totalPrice = garments
        .map((item) => parseInt(item.price) * parseInt(item.cuantity))
        .reduce((a, b) => {
          console.log(a, b);
          return a + b;
        }, 0);
    }

    var order = new Order({
      recieved_date: recievedDate,
      delivery_date: deliveryDate,
      client_name: clientName,
      client_id: clientId,
      client_address: clientAddress,
      client_phone: clientPhone,
      client_email: clientEmail,
      payment_total_payed: paymentTotalPayed.toString(),
      garment_total: totalGarments,
      payment_total: totalPrice.toString(),
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
    setOrderNumberTmp(orderNumber);
    setOrderNumber(orderNumber + 1);
    setGarments([]);

    const data = await window.go.main.App.CreateOrder(order);
    setOrder(data);
    handlePrint();
  };


  function ValidateEmail(mail) {
    if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return true;
  }

  const handleEmail = (event) => {
    const emailValid = ValidateEmail(event.target.value);
    console.log(emailValid);
    if (!emailValid)
      setError({
        email: "Error en el correo",
      });
    else
      setError({
        email: "",
      });
    setClientEmail(event.target.value);
  };

  // TODO: cambiar si se va a wails
  useEffect(() => {
    const getOrderCount = async () => {
      const data = await window.go.main.App.GetNextOrderIdentifier();
      setOrderNumber(("000000" + data).substr(-4, 4));
    };

    getOrderCount();
  }, [orderNumber]);

  return (
    <Container>
      <Navbar/>
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
        autoComplete="off"
      >
        <Box className={styles["details-wrap"]} autoComplete="off">
          <TextField
            required
            id="outlined-name"
            label="Cliente"
            className={styles["input"]}
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            // value={name}
            // onChange={handleChange}
          />
          <TextField
            required
            id="outlined-name"
            label="Email"
            className={styles["input"]}
            sx={{ marginTop: 3 }}
            error={error.email}
            helperText={error.email}
            onChange={(event) => handleEmail(event)}
            value={clientEmail}
            // onChange={handleChange}
          />
        </Box>
        <Box className={styles["details-wrap"]} autoComplete="off">
          <TextField
            required
            id="outlined-name"
            label="Cédula"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className={styles["input"]}
            onChange={(event) => setClientId(event.target.value)}
            value={clientId}
            // onChange={handleChange}
          />
          <TextField
            required
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
            required
            id="outlined-name"
            label="Teléfono"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            className={styles["input"]}
            onChange={(event) => setClientPhone(event.target.value)}
            value={clientPhone}
            // onChange={handleChange}
          />
        </Box>
        <Box className={styles["details-wrap"]} autoComplete="off">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField required {...props} sx={{ marginBottom: 3 }} />
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
              renderInput={(props) => <TextField required {...props} />}
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
        <PrendasComponent
          setGarments={setGarments}
          garments={garments}
          updateTotal={updateTotal}
          setUpdateTotal={setUpdateTotal}
        />
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
          <strong style={{ marginLeft: 5 }}>{totalGarments}</strong>
        </Box>
        <Box>
          <span>Total</span>
          <strong style={{ marginLeft: 5 }}>
            $
            {totalPrice
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
        </Box>
      </Box>
      {/* Abono */}
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          required
          id="outlined-name"
          label="Abono"
          type="string"
          InputLabelProps={{
            shrink: true,
          }}
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
      {order && (
        <PrintOrder
          order={order}
          orderNumber={orderNumberTmp}
          componentRef={printOrder}
          handlePrint={handlePrint}
        />
      )}
    </Container>
  );
};
