import moment from "moment";
import { forwardRef } from "react";

import "./PrintOrder.css";

export const PrintOrder = ({
  order,
  orderNumber,
  componentRef,
  handlePrint,
}) => {
  return (
    <div>
      <button onClick={handlePrint}>Print this out!</button>
      <ComponentToPrint
        ref={componentRef}
        order={order}
        orderNumber={orderNumber}
      />
    </div>
  );
};

const ComponentToPrint = forwardRef((props, ref) => {
  const { order, orderNumber } = props;

  return (
    <>
      <div className="print-container" style={{ margin: "0", padding: "0" }}>
        <div className="page-break" />
        {/* Compra */}
        <table ref={ref}>
          <thead>
            <tr>
              <th>Lava super</th>
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
                {moment(order.recieved_date).format("MMMM Do YYYY, h:mm:ss a")}
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
                  <td>{item.price}</td>
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
                {moment(order.delivery_date).format("MMMM Do YYYY, h:mm:ss a")}
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
                LAVA-SUPER no se responsabiliza por botones, hebillas, adornos,
                ni por objetos o dinero dejados en las prendas.
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                LAVA-SUPER no se responsabiliza por las variaciones que se
                produzcan en el color
              </td>
            </tr>
            <td></td>
          </tbody>
          {/* Owner */}
          <div className="page-break" />
          <thead>
            <tr>
              <th colSpan={3}>Lava super</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>Orden de servicio </td>
              <td>50</td>
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
            <tr>
              <td>1</td>
              <td colSpan={2}>Camisa masculino roja gucci</td>
            </tr>
            <tr>
              <td>1</td>
              <td colSpan={2}>Camisa masculino azul gucci</td>
            </tr>
            <tr>
              <td>1</td>
              <td colSpan={2}>Camisa masculino verde gucci</td>
            </tr>
            <tr>
              <td colSpan={2}></td>
              <td></td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>30,000</td>
              <td></td>
            </tr>
            <tr>
              <td>Abono:</td>
              <td>20,000</td>
              <td></td>
            </tr>
            <tr>
              <td>Saldo:</td>
              <td>10,000</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Entrega Aprox</td>
              <td colSpan={2}>2022-03-17 6:30pm</td>
            </tr>
            <tr>
              <td colSpan={3}>Observaciones:</td>
            </tr>
            <tr>
              <td colSpan={3}>Camisa masculino roja gucci - picado-moteado</td>
            </tr>
            <tr>
              <td colSpan={3}>Camisa masculino verde gucci - picado</td>
            </tr>
            <tr>
              <td colSpan={3}>Camisa masculino azul gucci - decolorado</td>
            </tr>
          </tbody>
        </table>
        {/* Owner */}
      </div>
    </>
  );
});
