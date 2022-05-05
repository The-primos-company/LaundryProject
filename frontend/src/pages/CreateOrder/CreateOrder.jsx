import { Navbar } from "../../components/Navbar";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrendasComponent from "../../components/PrendasComponent";
import { PrintOrder } from "../../components/PrintOrder/PrintOrder";
import { Order } from "../../wailsjs/go/models";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";

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
  const [garmentsData, setGarmentsData] = useState([]);
  const [error, setError] = useState({
    email: "",
    deliveryDate: "",
  });
  const [order, setOrder] = useState(null);
  const [updateTotal, setUpdateTotal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [generateOrderLoading, setGenerateOrderLoading] = useState(false);
  const [clients, setClients] = useState([]);

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
    onAfterPrint: () => setShowCreateOrderModal(!showCreateOrderModal),
  });

  const printedHandler = () => {
  };
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
    setGenerateOrderLoading(true);
    let tmpGarments = garments.map((item) => {
      delete item.realPrice;
      item.service_type = item.service;
      delete item.service
      return {
        ...item,
        defects: item.defects.join("-"),
        cuantity: item.cuantity.toString(),
        price: item.price.toString(),
      };
    });
    if (totalPrice === 0) {
      totalPrice = garments
        .map((item) => parseInt(item.price.replace('.','')) * parseInt(item.cuantity))
        .reduce((a, b) => {
          return a + b;
        }, 0);
    }

    let order = new Order({
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
    setOrder(order);
    setRecievedDate(new Date());
    setOrderNumberTmp(orderNumber);

    const data = await window.go.service.OrderService.CreateOrder(order, true);
    setOrder(data);

    handlePrint();
  };

  async function saveIntoDB() {
    let tmpGarments = garments.map((item) => {
      delete item.realPrice;
      return {
        ...item,
        defects: item.defects.join("-"),
        cuantity: item.cuantity.toString(),
        price: item.price.toString(),
      };
    });
    let order = new Order({
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
      service_type: "test",
    });
    setOrder(order);
    setRecievedDate(new Date());
    setOrderNumberTmp(orderNumber);
    await window.go.service.OrderService.CreateOrder(order, false);

    clearInputs();
    setGenerateOrderLoading(false);
    setShowCreateOrderModal(false);
  }

  function clearInputs() {
    setOrderNumber(orderNumber + 1);
    setClientName("");
    setClientId("");
    setClientAddress("");
    setClientPhone("");
    setClientEmail("");
    setPaymentTotalPayed("");
    setDeliveryDate(null);
    setGarments([]);
  }

  function ValidateEmail(mail) {
    if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return true;
  }

  const handleEmail = (event) => {
    const emailValid = ValidateEmail(event.target.value);
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
      const data =
        await window.go.service.OrderService.GetNextOrderIdentifier();
      setOrderNumber(("000000" + data).substr(-4, 4));
    };

    getOrderCount();
  }, [orderNumber]);

  useEffect(() => {
    const fetchClient = async () => {
      let clients = await window.go.service.ClientService.GetClients();
      setClients(clients);
    };

    fetchClient();
  }, []);

  const handleModalCancel = async () => {
    setShowCreateOrderModal(!showCreateOrderModal);
    setGenerateOrderLoading(false);
  };

  const handleClient = async (ev, value, reason, details) => {
    try {
      let client = await window.go.service.ClientService.GetClientsByName(
        100,
        0,
        value
      );

      setClientName(value);
      setClientId(client[0].identification);
      setClientAddress(client[0].address);
      setClientPhone(client[0].phone);
      setClientEmail(client[0].email);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar onafterprint={printedHandler} />
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
          <Autocomplete
            sx={{ width: 300 }}
            options={clients.map((client) => client.name)}
            onChange={(ev, value, reason, details) => {
              handleClient(ev, value, reason, details);
            }}
            defaultValue={clientName}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            required
            id="outlined-name"
            label="Correo Electrónico"
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
          garmentsData={garmentsData}
          setGarmentsData={setGarmentsData}
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
        <LoadingButton
          loading={generateOrderLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          onClick={greet}
        >
          Generar orden
        </LoadingButton>
      </Box>

      <Modal
        open={showCreateOrderModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Guardar orden
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿Deseas guardar y crear la nueva orden?
          </Typography>

          <Button
            variant="text"
            color="error"
            onClick={() => handleModalCancel()}
          >
            No
          </Button>
          <Button variant="text" onClick={() => saveIntoDB()}>
            Sí
          </Button>
        </Box>
      </Modal>

      {order && (
        <PrintOrder
          order={order}
          orderNumber={orderNumberTmp}
          componentRef={printOrder}
          handlePrint={handlePrint}
        />
      )}
    </>
  );
};
