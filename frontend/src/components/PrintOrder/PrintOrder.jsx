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
    <div ref={ref}>
      <div className="page-break">
        {/* Compra */}
        <table>
          <div className="">
            <img src={logo} alt="" />
          </div>
          <tbody>
            <tr>
              <td colSpan={2}>Orden de servicio </td>
              <td>{orderNumber}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Fecha de ingreso</td>
              <td>
                {moment(order.recieved_date).format("MMMM Do YYYY, h:mm a")}
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Cliente</td>
              <td>{order.client_name}</td>
              <td></td>
            </tr>
            <tr>
              <td>Cedula</td>
              <td>{order.client_id}</td>
              <td></td>
            </tr>
            <tr>
              <td>Direccion</td>
              <td>{order.client_address}</td>
              <td></td>
            </tr>
            <tr>
              <td>Telefono</td>
              <td>{order.client_phone}</td>
              <td></td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{order.client_email}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>cantidad</td>
              <td>Descripcion</td>
              <td>Valor</td>
            </tr>
            {order.garments.map((item) => {
              return (
                <tr>
                  <td>{item.cuantity}</td>
                  {/* <td>Camisa masculino roja gucci </td> */}
                  <td>
                    {item.category} {item.gendre} {item.color} {item.brand}
                  </td>
                  <td>${parseInt(item.cuantity) * parseInt(item.price)}</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Total Prendas:</td>
              <td>{order.garment_total}</td>
              <td></td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>{order.payment_total}</td>
              <td></td>
            </tr>
            <tr>
              <td>Abono:</td>
              <td>{order.payment_total_payed}</td>
              <td></td>
            </tr>
            <tr>
              <td>Saldo:</td>
              <td>{order.payment_total_real}</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Entrega Aprox</td>
              <td>
                {moment(order.delivery_date).format("MMMM Do YYYY, h:mm a")}
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Observaciones:</td>
              <td></td>
            </tr>
            {order.garments.map((item) => {
              if (item.comment == "" && item.defects == "") return <tr></tr>;
              return (
                <tr>
                  <td colSpan={3}>
                    {item.category} {item.gendre} {item.color} {item.brand}:{" "}
                    {item.comment} {item.defects}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>Nota:</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={3}>
                LAVA-SUR no se responsabiliza por botones, hebillas, adornos, ni
                por objetos o dinero dejados en las prendas.
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                LAVA-SUR no se responsabiliza por las variaciones que se
                produzcan en el color
              </td>
            </tr>
            <td></td>
          </tbody>
        </table>
      </div>
      <div className="page-break">
        {/* Owner */}
        <Container>
          <Stack direction={"row"} justifyContent="center">
            <img src={logo} alt="" />
          </Stack>
          <Stack>
            <strong>Cra 122 # 122 - 16A - 18 Alto Pance</strong>
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
                  <td>
                    <strong>Cantidad</strong>
                  </td>
                  <td>
                    <strong>Descripcion</strong>
                  </td>
                </tr>
                {order.garments.map((item) => {
                  return (
                    <tr>
                      <td style={{ textAlign: "center" }}>{item.cuantity}</td>
                      <td>
                        {item.category} {item.gendre} {item.color} {item.brand}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent="space-between"
            sx={{ marginTop: 2, marginBottom: 1 }}
          >
            <strong>Entrega Aprox</strong>
            <span>
              {moment(order.delivery_date).format("MMMM d YYYY, h:mm a")}
            </span>
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
        </Container>
      </div>
    </div>
  );
});
