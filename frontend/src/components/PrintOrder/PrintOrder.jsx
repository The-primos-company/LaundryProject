import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import "./PrintOrder.css";

export const PrintOrder = ({ order }) => {
  console.log("Order =>", order);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} order={order} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

const ComponentToPrint = forwardRef((props, ref) => {
  console.log("Print =>", props);
  const { order } = props;
  return (
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
            <td>50</td>
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
            <td>
              {order.payment_total} - {order.payment_total_payed}
            </td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Entrega Aprox</td>
            <td>{order.delivery_date}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Observaciones:</td>
            {order.garments.map((item) => {
              return (
                <td>
                  {item.category} {item.gendre} {item.color} {item.brand}:{" "}
                  {item.comment} {item.defects}
                </td>
              );
            })}

            <td></td>
          </tr>
          <tr>
            <td>Nota</td>
            <td>
              LAVA-ROPAS no se responsabiliza por botones, hebillas, adornos, ni
              por objetos o dinero dejados en las prendas.
            </td>
            <td>
              LAVA-ROPAS no se responsabiliza por las variaciones que se
              produzcan en el color
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
