import moment from "moment";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import "./PrintOrder.css";

export const PrintOrder = ({ order, orderNumber }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
  let total =
    parseInt(order.payment_total.replace("$", "")) -
    parseInt(order.payment_total_payed.replace("$", ""));
  return (
    <>
      <div className="print-container" style={{ margin: "0", padding: "0" }}>
        <div className="page-break" />
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
              <td></td>
              <td>{orderNumber}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Fecha de ingreso</td>
              <td></td>
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
              <td>Nota</td>
              <tr>
                <td>
                  LAVA-ROPAS no se responsabiliza por botones, hebillas,
                  adornos, ni por objetos o dinero dejados en las prendas.
                </td>
              </tr>
              <tr>
                <td>
                  LAVA-ROPAS no se responsabiliza por las variaciones que se
                  produzcan en el color
                </td>
              </tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
});
