import './App.css';
import React, { useState } from "react";
import { Order, Client } from "./wailsjs/go/models";

function App() {
  const [orderIdentifier, setOrderIdentifier] = useState([]);
  const [orderReceivedDate, setOrderReceivedDate] = useState([]);
  const [orderDeliveryDate, setOrderDeliveryDate] = useState([]);

  const [clientName, setClientName] = useState([]);
  const [clientAddress, setClientAddress] = useState([]);
  const [clientPhone, setClientPhone] = useState([]);


  const createOrder = (data) => {
    const client = new Client({
      name: clientName,
      address: clientAddress,
      phone: clientPhone,
    });

    const order = new Order({
      number: orderIdentifier,
      receivedDate: orderReceivedDate,
      deliveryDate: orderDeliveryDate,
      client,
    })
    window.go.main.App.CreateOrder(order).then(data => {
      console.log(data);
    });
  }

  return (
    <div>
      <div className="logo"></div>
      <div className="input-box" id="input" data-wails-no-drag>
        orden de servicio:
        <input className="input" id="orderIdentifier" type="text" autoComplete="off" onChange={e => { setOrderIdentifier(e.target.value) }}></input>
      </div>
      <div className="input-box" id="input" data-wails-no-drag>
        Cliente:
        <input className="input" id="clientName" type="text" autoComplete="off" onChange={e => { setClientName(e.target.value) }}></input>
      </div>
      <div className="input-box" id="input" data-wails-no-drag>
        Dirección:
        <input className="input" id="clientAddress" type="text" autoComplete="off" onChange={e => { setClientAddress(e.target.value) }}></input>
      </div>
      <div className="input-box" id="input" data-wails-no-drag>
        Teléfono:
        <input className="input" id="clientPhone" type="text" autoComplete="off" onChange={e => { setClientPhone(e.target.value) }}></input>
      </div>
      <div className="input-box" id="input" data-wails-no-drag>
        Fecha de recibido:
        <input className="input" id="orderReceivedDate" type="text" autoComplete="off" onChange={e => { setOrderReceivedDate(e.target.value) }}></input>
      </div>
      <div className="input-box" id="input" data-wails-no-drag>
        Fecha de entrega:
        <input className="input" id="orderDeliveryDate" type="text" autoComplete="off" onChange={e => { setOrderDeliveryDate(e.target.value) }}></input>
      </div>
      <button className="btn" onClick={() => createOrder()}>Crear Orden</button>
    </div>
  );
}

export default App;
