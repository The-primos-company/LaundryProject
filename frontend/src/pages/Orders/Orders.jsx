import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Navbar } from '../../components/Navbar'
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Box } from "@mui/system";
import { PrintOrder } from "../../components/PrintOrder/PrintOrder";

export const Orders = ({ setRoute }) => {
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const printOrder = useRef();
  const handlePrint = useReactToPrint({
    content: () => printOrder.current,
  });

  const handleOrder = (id) => {
    setLoading(true);
    let order = orders.filter((item) => item.ID === id);
    setOrder(order[0]);
    setTimeout(() => {
      handlePrint();
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    const getOrder = async () => {
      const orderList = await window.go.service.OrderService.GetOrdersList(100, 0);
      setOrders(orderList);
    };
    getOrder();
  }, []);

  return (
    <>
      <Navbar />
      <Stack>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          {orders &&
            orders.map((item) => {
              if (loading) return null;
              let orderText = `Orden de servicio: ${item.identifier}`;
              return (
                <nav
                  aria-label="main mailbox folders"
                  // key={item.ID}
                  onClick={() => handleOrder(item.ID)}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={orderText} />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              );
            })}
        </Box>
      </Stack>
      {order && (
        <PrintOrder
          order={order}
          orderNumber={order.identifier}
          componentRef={printOrder}
          handlePrint={handlePrint}
        />
      )}
    </>
  );
};
