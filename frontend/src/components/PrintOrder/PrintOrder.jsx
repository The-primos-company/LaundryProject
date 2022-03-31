import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import "./PrintOrder.css";

export const PrintOrder = (order) => {
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

const ComponentToPrint = forwardRef(({ order }, ref) => {
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
            <td>Happy</td>
            <td></td>
          </tr>
          <tr>
            <td>Cedula</td>
            <td>1234123</td>
            <td></td>
          </tr>
          <tr>
            <td>Direccion</td>
            <td>avn siempre viva</td>
            <td></td>
          </tr>
          <tr>
            <td>Telefono</td>
            <td>1234123</td>
            <td></td>
          </tr>
          <tr>
            <td>Email</td>
            <td>happy@happy.com</td>
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
          <tr>
            <td>1</td>
            <td>Camisa masculino roja gucci </td>
            <td>10000</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Camisa masculino azul gucci </td>
            <td>10000</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Camisa masculino verde gucci </td>
            <td>10000</td>
          </tr>
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
            <td>2022-03-17 6:30pm</td>
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
            <td></td>
          </tr>
          <tr>
            <td>cubrelechos delicado</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});
