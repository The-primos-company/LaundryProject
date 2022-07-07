import { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useReactToPrint } from "react-to-print";
import {
  Button,
  Container,
  List,
  ListItem,
  MenuItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Pagination,
  PaginationItem,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Box } from "@mui/system";
import ResultsGarmentsTable from "./ResultsGarmentsTable";
import { PrintOrDownload } from "../../components/PrintOrDownload";

export const Results = ({ setRoute }) => {
  const [garments, setGarments] = useState([]);
  const [filterBy, setfilterBy] = useState("created_at");
  const [totalGarments, setTotalGarments] = useState(0);
  const [totalPriceTotal, setTotalPriceTotal] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalUtilities, setTotalUtilities] = useState(0)
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [clearFields, setClearFields] = useState(false);
  const [refreshSeeOrders, setRefreshSeeOrders] = useState(false);

  useEffect(() => {
    setClearFields(false);
    setRefreshSeeOrders(false);
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    setInicio(oneMonthAgo);
    setFin(new Date());
  }, [clearFields, refreshSeeOrders]);

  const filterItems = [{ value: "created_at", label: "Fecha de recibido" }];

  const clearFilter = () => {
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    setInicio(oneMonthAgo);
    setFin(new Date());
    setfilterBy("created_at");
    setClearFields(true);
  };

  const onSubmit = async () => {
    try {
      console.log(inicio, fin);
      let data = await window.go.service.GarmentService.GetSumaryGarments(
        inicio,
        fin
      );
      setGarments(data.data);
      setTotalPriceTotal(data.total_price_total);
      setTotalGarments(data.total_garments);
      setTotalCost(data.total_cost);
      setTotalUtilities(data.total_utilities);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(garments)

  const printOrder = useRef();
  const handlePrint = useReactToPrint({
    content: () => printOrder.current,
  });

  return (
    <>
      <Navbar />
      <Stack>
        {garments && (
          <>
          <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Stack>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.terceary">
                  Total Prendas: <strong>{totalGarments}</strong>
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.terceary">
                  Total Facturado : <strong>{totalPriceTotal}</strong>
                  {/* payment_paid */}
                </Typography>
              </Stack>
              <Stack>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.terceary">
                  Total Costo de Servicio: <strong>{totalCost}</strong>
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="h6" color="text.terceary">
                  Total Utilidades: <strong>{totalUtilities}</strong>
                  {/* payment_factured */}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-select-currency"
                select
                label="Fecha de creacion"
                value={filterBy}
                onChange={(e) => setfilterBy(e.target.value)}
                sx={{ width: "20%" }}
              >
                {filterItems.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={inicio}
                  onChange={(value) => {
                    setInicio(value.toISOString());
                  }}
                  renderInput={(props) => (
                    <TextField required {...props} sx={{ marginBottom: 3 }} />
                  )}
                  label="Inicio"
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  value={fin}
                  onChange={(value) => {
                    setFin(value.toISOString());
                  }}
                  renderInput={(props) => (
                    <TextField required {...props} sx={{ marginBottom: 3 }} />
                  )}
                  label="Fin"
                />
              </LocalizationProvider>
              <Button onClick={onSubmit}>Buscar</Button>
              <Button onClick={clearFilter}>Limpiar</Button>
              <Button onClick={handlePrint}>Descargar Reporte</Button>

              {/* <PrintOrDownload PdfPrint={printOrder} handlePdfPrint={handlePrint} orders={garments}/> */}
            </Stack>
          </>
        )}
      </Stack>
      <div style={{ height: 600, width: "100%", marginBottom: 60 }}>
      <div style={{ display: "none" }}>
        <div ref={printOrder}>
        <p>Total Prendas: <strong>{totalGarments}</strong></p>
        <p>Total Facturado : <strong>{totalPriceTotal}</strong></p>
        <p>Total Costo de Servicio: <strong>{totalCost}</strong></p>
        <p>Total Utilidades: <strong>{totalUtilities}</strong></p>
        <table style={{ marginBottom: 10 }}>
          <tbody>
            <tr>
              <td className="border">
                <strong>Prendas</strong>
              </td>
              <td className="border">
                <strong>Total</strong>
              </td>
              <td className="border">
                <strong>Servicio</strong>
              </td>
              <td className="border">
                <strong>Total facturado</strong>
              </td>
              <td className="border">
                <strong>Costo de servicio</strong>
              </td>
              <td className="border">
                <strong>Utilidades</strong>
              </td>
            </tr>
            {garments && garments.map((item) => 
              (
                <tr>
                  <td className="border" style={{ fontSize: 13 }}>
                    {item.category}
                  </td>
                  <td className="border" style={{ alignContent: "center" }}>
                    {item.cuantity}
                  </td>
                  <td className="border" style={{ fontSize: 13 }}>
                    {item.service_type}
                  </td>
                  <td className="border" style={{ fontSize: 13 }}>
                    {item.price_total}
                  </td>
                  <td className="border" style={{ fontSize: 13 }}>
                    {item.cost_total}
                  </td>
                  <td className="border" style={{ fontSize: 13 }}>
                    {item.utilities}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        </div>
      </div>
        {<ResultsGarmentsTable setGarments={setGarments} garments={garments} />}
      </div>
    </>
  );
};
