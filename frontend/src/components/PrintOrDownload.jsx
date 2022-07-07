import React, { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Container, Stack } from "@mui/material";
import { isEmpty } from "lodash";
import moment from "moment";
// import logo from "../../assets/images/logodark.jpeg";
import logo from "../assets/images/logodark.jpeg";
import "moment/locale/es";
moment.locale("es");

export const PrintOrDownload = ({ PdfPrint, handlePdfPrint, orders }) => {
  const generateReport = () => {
    if (isEmpty(orders)) {
      return;
    } else {
      console.log("entra");
      handlePdfPrint();
    }
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={PdfPrint} orders={orders} />
      </div>
      <Button onClick={generateReport}>Descargar Reporte</Button>
    </>
  );
};

const ComponentToPrint = forwardRef((props, ref) => {
  const { orders } = props;

  console.log("Orders in search => ", orders);

  return (
    <Container ref={ref}>
      {/* Compra */}
      {orders &&
        orders.map((order) => (
          <>
            <div style={{ display: "table" }} className="no-skip">
              <Stack
                direction={"row"}
                justifyContent="center"
                sx={{ marginTop: 2 }}
              >
                <img src={logo} alt="" />
              </Stack>
              <Stack>
                <strong style={{ fontSize: 10 }}>
                  Cra 122 # 16A - 18 Alto Pance
                </strong>
                <strong style={{ fontSize: 10, alignContent: "center" }}>
                  Teléfono fijo: 3715499
                </strong>
                <strong style={{ fontSize: 10 }}>Celular: 315 2479406</strong>
              </Stack>
              <Stack
                sx={{ marginTop: 3 }}
                direction={"row"}
                justifyContent="space-between"
              >
                <span>Orden de servicio</span>
                <strong>{order.identifier}</strong>
              </Stack>

              <Stack direction={"column"} sx={{ marginBottom: 2 }}>
                <span>Fecha de ingreso </span>
                <strong style={{ marginBottom: 2 }}>
                  {moment(order.recieved_date).format("MMMM D YYYY, h:mm a")}
                </strong>
                <span>
                  Cliente: <strong>{order.client_name}</strong>
                </span>
                <span>
                  Cedula: <strong>{order.client_id}</strong>
                </span>
                <span>
                  Direccion: <span>{order.client_address}</span>
                </span>

                <span>Telefono: {order.client_phone}</span>
                <span>
                  Email: <span>{order.client_email}</span>
                </span>
              </Stack>
              <table style={{ marginBottom: 10 }}>
                <tbody>
                  <tr>
                    <td className="border">
                      <strong>Cant</strong>
                    </td>
                    <td className="border">
                      <strong>Descripcion</strong>
                    </td>
                    <td className="border">
                      <strong>Valor</strong>
                    </td>
                  </tr>
                  {order.garments.map((item) => {
                    return (
                      <tr>
                        <td
                          className="border"
                          style={{ alignContent: "center" }}
                        >
                          {item.cuantity}
                        </td>
                        {/* <td>Camisa masculino roja gucci </td> */}
                        <td className="border" style={{ fontSize: 10 }}>
                          {item.category} {item.gendre} {item.color}{" "}
                          {item.brand} {item.service_type}
                        </td>
                        <td className="border" style={{ fontSize: 13 }}>
                          ${parseInt(item.cuantity) * parseInt(item.price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Stack
                direction={"column"}
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
              >
                <span>Total Prendas: {order.garment_total}</span>
                <span>Total: {order.payment_total}</span>
                <span>Abono: {order.payment_total_payed}</span>
                <span>Pagado: {order.payment_paid}</span>
                <span>
                  Saldo: <strong>{order.payment_total_real}</strong>
                </span>
                {order.payed_at && (
                  <div>
                    <span>Fecha de pagado </span> <br></br>
                    <strong style={{ marginBottom: 2 }}>
                      {moment(order.payed_at).format("MMMM D YYYY, h:mm a")}
                    </strong>
                  </div>
                )}
                {order.delivered_at && (
                  <div>
                    <span>Fecha de entregado </span> <br></br>
                    <strong style={{ marginBottom: 2 }}>
                      {moment(order.delivered_at).format("MMMM D YYYY, h:mm a")}
                    </strong>
                  </div>
                )}
                <span>Entrega Aprox:</span>
                <strong>
                  {moment(order.delivery_date).format("MMMM D YYYY, h:mm a")}
                </strong>
              </Stack>
              <Stack direction={"column"} justifyContent="space-between">
                {" "}
                {order.garments.length > 0 && <strong>Observaciones:</strong>}
                {order.garments.map((item) => {
                  if (item.comment === "" && item.defects === "") return <></>;
                  return (
                    <>
                      <span style={{ marginBottom: 5, fontSize: 10 }}>
                        {item.category} {item.gendre} {item.color} {item.brand}:{" "}
                        {item.comment} {item.defects}
                      </span>
                    </>
                  );
                })}
              </Stack>
              <Stack>
                <strong>Nota:</strong>
                <span style={{ fontSize: 10 }}>
                  LAVA-SUR no se responsabiliza por botones, hebillas, adornos,
                  ni por objetos o dinero dejados en las prendas.
                </span>
                <span style={{ fontSize: 10 }}>
                  LAVA-SUR no se responsabiliza por las variaciones que se
                  produzcan en el color
                </span>
              </Stack>
            </div>
            <div className="page-break"></div>
          </>
        ))}
    </Container>
  );
});
