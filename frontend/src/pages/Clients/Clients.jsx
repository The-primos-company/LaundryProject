import React, { useState, useEffect } from 'react'
import { Navbar } from '../../components/Navbar'
import ClientsPricesTable from './ClientsTable'

import { Container, Stack, TextField, Button, FormControl, InputLabel, Input, InputAdornment } from "@mui/material";
import { Search } from '@mui/icons-material'

import { Client} from "../../wailsjs/go/models";



export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [updateTotal, setUpdateTotal] = useState(false);
  const [searchValue, setSearchValue] = useState("")

  const [name, setName] = useState("")
  const [identification, setIdentification] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [clearList, setClearList] = useState("")



  useEffect(() => {
    const fetchData = async () => {
      setClearList(false)
      
      const data = await window.go.service.ClientService.GetClientsByName(100, 0, "");
      setSearchValue("")
      setClients(data)
    }
    fetchData()
  }, [clearList])

  const addClients = async () => {
    if (!name) return
    var client = new Client({
      name,
      identification,
      address,
      phone,
      email,
    });
    try {
      await window.go.service.ClientService.CreateClient(client);
      setName("")
      setIdentification("")
      setAddress("")
      setPhone("")
      setEmail("")
      setClearList(true)
    } catch (e) {
      console.error(e)
    }
  }

  const onSearhValue = async () => {
    const data = await window.go.service.ClientService.GetClientsByName(100, 0, searchValue);
    setClients(data)
  }

  return (
    <>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-around"
        alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <TextField id="outlined-basic" label="Nombre *" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField id="outlined-basic" label="cedula" variant="outlined" value={identification} onChange={(e) => setIdentification(e.target.value)} />
        <TextField id="outlined-basic" label="direccion" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
        <TextField id="outlined-basic" label="telefono" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <TextField id="outlined-basic" label="Correo electrónico" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-around"
        alignItems="center">
        <Button onClick={addClients} >Añadir cliente</Button>
      </Stack>
      <Stack>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            Nombre del cliente
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={onSearhValue}
            endAdornment={
              <InputAdornment position="start" >
                <Search />
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-around"
        alignItems="center">
        <Button onClick={onSearhValue}>Buscar</Button>
        <Button onClick={() => setClearList(!clearList)}>Limpiar</Button>
      </Stack>
      {/* Prendas */}
      <div style={{ height: 300, width: "100%", marginBottom: 60 }}>
        {<ClientsPricesTable
          setClients={setClients}
          clients={clients}
          updateTotal={updateTotal}
          setUpdateTotal={setUpdateTotal}
        />}
      </div>
    </>
  )
}
