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
      <div className="page-break">
        <h1>page 1</h1>
      </div>
      <div className="page-break">
        <h1>page 1</h1>
      </div>
    </>
  );
});
