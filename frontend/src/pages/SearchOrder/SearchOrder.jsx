import React from 'react'
import { Navbar } from '../../components/Navbar'
import {
  Container,
  Stack,
  TextField,
  MenuItem,
  Button
} from "@mui/material";

const items = [
  { value: "numeroDeOrden", label: "Numero de orden" },
  { value: "nombreDelCliente", label: "Nombre del cliente" },
]

export const SearchOrder = ({ setRoute }) => {
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <Container>
      <Navbar />
      <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ width: '100vh' }} >
        <Stack>
          <TextField id="outlined-search" helperText="Campo de texto con el valor a buscar" type="search" sx={{ width: '100%' }} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            id="outlined-select-currency"
            select
            label="Buscar por"
            value={currency}
            onChange={handleChange}
            sx={{ width: '25ch' }}
          >
            {items.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined">Buscar</Button>
        </Stack>
      </Stack>
    </Container>
  )
}
