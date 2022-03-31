import moment from "moment";
import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import "./PrintOrder.css";

export const PrintOrderOwner = ({ order, orderNumber }) => {
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

  return (
    <>
      <div className="print-container" style={{ margin: "0", padding: "0" }}>
        <div className="page-break" />
        <table>
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
      </div>
    </>
  );
});
