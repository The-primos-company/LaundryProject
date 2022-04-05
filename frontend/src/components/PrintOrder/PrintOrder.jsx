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
      {/* <button onClick={handlePrint}>Print this out!</button> */}
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
    <Container ref={ref}>
      {/* Compra */}
      <div style={{ display: "table" }} className="no-skip">
        <Stack direction={"row"} justifyContent="center" sx={{ marginTop: 2 }}>
          <img src={logo} alt="" />
        </Stack>
        <Stack>
          <strong style={{ fontSize: 10 }}>
            Cra 122 # 16A - 18 Alto Pance
          </strong>
          <strong style={{ fontSize: 10, alignContent: "center" }}>Teléfono fijo: 3715499</strong>
          <strong style={{ fontSize: 10 }}>Celular: 315 2479406</strong>
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
                  <td className="border" style={{ alignContent: "center" }}>{item.cuantity}</td>
                  {/* <td>Camisa masculino roja gucci </td> */}
                  <td className="border" style={{ fontSize: 10 }}>
                    {item.category} {item.gendre} {item.color} {item.brand}
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
          <span>
            Saldo: <strong>{order.payment_total_real}</strong>
          </span>
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
                <span style={{ marginBottom: 5, fontSize: 10 }} > 
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
            LAVA-SUR no se responsabiliza por botones, hebillas, adornos, ni por
            objetos o dinero dejados en las prendas.
          </span>
          <span style={{ fontSize: 10 }}>
            LAVA-SUR no se responsabiliza por las variaciones que se produzcan
            en el color
          </span>
        </Stack>
      </div>
      <div className="page-break"></div>
      {/* Owner */}
      <div style={{ display: "table" }} className="no-skip">
        <Stack direction={"row"} justifyContent="center" sx={{ marginTop: 2 }}>
          <img src={logo} alt="" />
        </Stack>
        <Stack>
          <strong style={{ fontSize: 10 }}>
            Cra 122 # 16A - 18 Alto Pance
          </strong>
          <strong style={{ fontSize: 10 }}>Teléfono fijo: 3715499</strong>
          <strong style={{ fontSize: 10 }}>Celular: 315 2479406</strong>
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
                  <strong>Cant</strong>
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
                    <td className="border" style={{ fontSize: 15 }}>
                      {item.category} {item.gendre} {item.color} {item.brand}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Stack>
        <Stack direction={"column"} sx={{ marginTop: 2, marginBottom: 1 }}>
          <span>Total Prendas: {order.garment_total}</span>
          <span>Entrega Aprox</span>
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
              <span style={{ marginBottom: 5, fontSize: 10 }}>
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
