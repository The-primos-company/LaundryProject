import { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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

export const Results = ({ setRoute }) => {
  const [orders, setOrders] = useState([]);
  const [garments, setGarments] = useState([]);
  const [filterBy, setfilterBy] = useState("created_at");
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
      let data = await window.go.service.GarmentService.GetSumaryGarments(
        inicio,
        fin
      );
      setGarments(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <Stack>
        {orders && (
          <>
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
            </Stack>
          </>
        )}
      </Stack>
      <div style={{ height: 600, width: "100%", marginBottom: 60 }}>
        {<ResultsGarmentsTable setGarments={setGarments} garments={garments} />}
      </div>
    </>
  );
};
