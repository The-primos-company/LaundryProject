import moment from "moment";
import { forwardRef } from "react";
import logo from "../../assets/images/logo.jpeg";
import "moment/locale/es";

import "./PrintOrder.css";
import { Container, Stack } from "@mui/material";
import "moment/locale/es";
moment.locale("es");

export const PrintOrder = ({
  order,
  orderNumber,
  componentRef,
  handlePrint,
}) => {
  return (
    <>
      {" "}
      <button onClick={handlePrint}>Print this out!</button>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={componentRef}
          order={order}
          orderNumber={orderNumber}
        />
      </div>
    </>
  );
};

const ComponentToPrint = forwardRef((props, ref) => {
  const { order, orderNumber } = props;

  return (
    <Container>
      <div className="page-break">
        {/* Compra */}
        <Stack direction={"row"} justifyContent="center">
          <img src={logo} alt="" />
        </Stack>
        <Stack>
          <strong style={{ fontSize: 15 }}>
            Cra 122 # 122 - 16A - 18 Alto Pance
          </strong>
          <strong>Teléfono fijo: 3715499</strong>
          <strong>Celular: 315 2479406</strong>
        </Stack>
        <Stack
          sx={{ marginTop: 3 }}
          direction={"row"}
          justifyContent="space-between"
        >
          <span>Orden de servicio</span>
          <strong>{orderNumber}</strong>
        </Stack>

        <Stack direction={"column"} sx={{ marginBottom: 2 }}>
          <span>Fecha de ingreso</span>
          <strong style={{ marginBottom: 2 }}>
            {moment(order.recieved_date).format("MMMM d YYYY, h:mm a")}
          </strong>
          <span>
            Cliente: <strong>{order.client_name}</strong>
          </span>
          <span>
            Cedula: <strong>{order.client_id}</strong>
          </span>
          <span>Direccion:</span>
          <span>{order.client_address}</span>
          <span>Telefono:</span>
          <span>{order.client_phone}</span>
          <span>Email:</span>
          <span>{order.client_email}</span>
        </Stack>

        <table style={{ marginBottom: 10 }}>
          <tbody>
            <tr>
              <td className="border">
                <strong>Cantidad</strong>
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
                  <td className="border">{item.cuantity}</td>
                  {/* <td>Camisa masculino roja gucci </td> */}
                  <td className="border">
                    {item.category} {item.gendre} {item.color} {item.brand}
                  </td>
                  <td className="border">
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
          <span>
            Saldo: <strong>{order.payment_total_real}</strong>
          </span>
          <span>Entrega Aprox:</span>
          <strong>
            {moment(order.delivery_date).format("MMMM d YYYY, h:mm a")}
          </strong>
        </Stack>
        <Stack direction={"column"} justifyContent="space-between">
          {" "}
          <strong>Observaciones:</strong>
          {order.garments.map((item) => {
            if (item.comment === "" && item.defects === "") return <></>;
            return (
              <>
                <span style={{ marginBottom: 5 }}>
                  {item.category} {item.gendre} {item.color} {item.brand}:{" "}
                  {item.comment} {item.defects}
                </span>
              </>
            );
          })}
        </Stack>
        <Stack>
          <strong>Nota:</strong>
          <span>
            LAVA-SUR no se responsabiliza por botones, hebillas, adornos, ni por
            objetos o dinero dejados en las prendas.
          </span>
          <span>
            LAVA-SUR no se responsabiliza por las variaciones que se produzcan
            en el color
          </span>
        </Stack>
      </div>
      <div className="page-break">
        {/* Owner */}
        <Stack direction={"row"} justifyContent="center">
          <img src={logo} alt="" />
        </Stack>
        <Stack>
          <strong style={{ fontSize: 15 }}>
            Cra 122 # 122 - 16A - 18 Alto Pance
          </strong>
          <strong>Teléfono fijo: 3715499</strong>
          <strong>Celular: 315 2479406</strong>
        </Stack>
        <Stack
          sx={{ marginTop: 5, marginBottom: 2 }}
          direction={"row"}
          justifyContent="space-between"
        >
          <span>Orden de servicio</span>
          <strong>{orderNumber}</strong>
        </Stack>
        <Stack>
          <table>
            <tbody>
              <tr>
                <td className="border">
                  <strong>Cantidad</strong>
                </td>
                <td className="border">
                  <strong>Descripcion</strong>
                </td>
              </tr>
              {order.garments.map((item) => {
                return (
                  <tr>
                    <td className="border" style={{ textAlign: "center" }}>
                      {item.cuantity}
                    </td>
                    <td className="border">
                      {item.category} {item.gendre} {item.color} {item.brand}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Stack>
        <Stack direction={"column"} sx={{ marginTop: 2, marginBottom: 1 }}>
          <span>Entrega Aprox</span>
          <strong>
            {moment(order.delivery_date).format("MMMM d YYYY, h:mm a")}
          </strong>
        </Stack>
        <Stack direction={"column"} justifyContent="space-between">
          {" "}
          <strong>Observaciones:</strong>
          {order.garments.map((item) => {
            if (item.comment === "" && item.defects === "") return <></>;
            return (
              <span style={{ marginBottom: 5 }}>
                {item.category} {item.gendre} {item.color} {item.brand}:{" "}
                {item.comment} {item.defects}
              </span>
            );
          })}
        </Stack>
      </div>
    </Container>
  );
});
