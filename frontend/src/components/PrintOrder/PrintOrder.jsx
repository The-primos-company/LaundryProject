import moment from "moment";
import { forwardRef } from "react";
import logo from "../../assets/images/logo.jpeg";

import "./PrintOrder.css";
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
        <img src="logo" alt="" />
        <table>
          <thead>
            <tr>
              <th>Lava Sur</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Orden de servicio </td>
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
                  <td>${item.price}</td>
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
                LAVA-SUR no se responsabiliza por botones, hebillas, adornos,
                ni por objetos o dinero dejados en las prendas.
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
        <img src="logo" alt="" />
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Lava Sur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>Orden de servicio </td>
              <td>{orderNumber}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>cantidad</td>
              <td colSpan={2}>Descripcion</td>
            </tr>
            {order.garments.map((item) => {
              return (
                <tr>
                  <td>{item.cuantity}</td>
                  <td colSpan={2}>
                    {item.category} {item.gendre} {item.color} {item.brand}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={2}></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Entrega Aprox</td>
              <td colSpan={2}>
                {moment(order.delivery_date).format("MMMM Do YYYY, h:mm a")}
              </td>
            </tr>
            <tr>
              <td colSpan={3}>Observaciones:</td>
            </tr>
            {order.garments.map((item) => {
              return (
                <tr>
                  <td colSpan={3}>
                    {item.category} {item.gendre} {item.color} {item.brand}:{" "}
                    {item.comment} {item.defects}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});
