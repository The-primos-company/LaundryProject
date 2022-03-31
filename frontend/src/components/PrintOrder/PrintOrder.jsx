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
    </div>
  );
});
