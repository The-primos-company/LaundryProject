import { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import "./PrintOrder.css";

export const PrintOrder = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

const ComponentToPrint = forwardRef((props, ref) => (
  <div className="print-container" style={{ margin: "0", padding: "0" }}>
    <div className="page-break" />
    <table className="tg" ref={ref}>
      <thead>
        <tr>
          <th className="tg-8d8j" colSpan="3">
            Lava super
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="tg-8d8j" colSpan="2">
            Orden de servicio{" "}
          </td>
          <td className="tg-8d8j">50</td>
        </tr>
        <tr>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-8d8j" colSpan="2">
            Fecha de ingreso
          </td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-nrix">Cliente</td>
          <td className="tg-cly1" colSpan="2">
            Happy
          </td>
        </tr>
        <tr>
          <td className="tg-nrix">Cedula</td>
          <td className="tg-cly1" colSpan="2">
            1234123
          </td>
        </tr>
        <tr>
          <td className="tg-nrix">Direccion</td>
          <td className="tg-cly1" colSpan="2">
            avn siempre viva
          </td>
        </tr>
        <tr>
          <td className="tg-nrix">Telefono</td>
          <td className="tg-cly1" colSpan="2">
            1234123
          </td>
        </tr>
        <tr>
          <td className="tg-nrix">Email</td>
          <td className="tg-cly1" colSpan="2">
            happy@happy.com
          </td>
        </tr>
        <tr>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-8d8j">cantidad</td>
          <td className="tg-8d8j">Descripcion</td>
          <td className="tg-8d8j">Valor</td>
        </tr>
        <tr>
          <td className="tg-nrix">1</td>
          <td className="tg-nrix">Camisa masculino roja gucci </td>
          <td className="tg-nrix">10000</td>
        </tr>
        <tr>
          <td className="tg-8d8j">1</td>
          <td className="tg-8d8j">
            Camisa masculino azul
            gucci&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </td>
          <td className="tg-nrix">10000</td>
        </tr>
        <tr>
          <td className="tg-8d8j">1</td>
          <td className="tg-8d8j">
            Camisa masculino verde
            gucci&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </td>
          <td className="tg-nrix">10000</td>
        </tr>
        <tr>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-7zrl">Total:</td>
          <td className="tg-nrix">30,000</td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-7zrl">Abono:</td>
          <td className="tg-nrix">20,000</td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-j6zm">
            <span style={{ fontWeight: "bold" }}>Saldo:</span>
          </td>
          <td className="tg-wa1i">
            <span style={{ fontWeight: "bold" }}>10,000</span>
          </td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-8d8j">Entrega Aprox</td>
          <td className="tg-bobw" colSpan="2">
            <span style={{ fontWeight: "bold" }}>2022-03-17 6:30pm</span>
          </td>
        </tr>
        <tr>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-8d8j" colSpan="2">
            Observaciones:
          </td>
          <td className="tg-7zrl"></td>
        </tr>
        <tr>
          <td className="tg-7zrl" colSpan="3">
            cubrelechos delicado
          </td>
        </tr>
      </tbody>
    </table>
  </div>
));
