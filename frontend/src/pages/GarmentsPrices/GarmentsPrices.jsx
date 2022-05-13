import React, { useState, useEffect } from 'react'
import { Navbar } from '../../components/Navbar'
import GarmentsPricesTable from './GarmentsPricesTable'

import { Container, Stack, TextField, Button, FormControl, InputLabel, Input, InputAdornment } from "@mui/material";
import { Search } from '@mui/icons-material'

import { Price } from "../../wailsjs/go/models";



export const GarmentsPrices = () => {
  const [garments, setGarments] = useState([]);
  const [updateTotal, setUpdateTotal] = useState(false);
  const [searchValue, setSearchValue] = useState("")

  const [category, setCategory] = useState("")
  const [priceWashing, setPriceWashing] = useState("")
  const [priceIroning, setPriceIroning] = useState("")
  const [priceDyeing, setPriceDyeing] = useState("")
  const [costWashing, setCostWashing] = useState("")
  const [costIroning, setCostIroning] = useState("")
  const [costDyeing, setCostDyeing] = useState("")
  const [clearList, setClearList] = useState(false)




  useEffect(() => {
    const fetchData = async () => {
      setClearList(false)
      const data = await window.go.service.PriceService.GetPricesByCategory(100, 0, "");
      setSearchValue("")
      setGarments(data)
    }
    fetchData()
  }, [clearList])


  const addGarment = async () => {
    if (!category || !priceWashing || !priceIroning || !priceDyeing|| !costWashing || !costIroning || !costDyeing) return
    var price = new Price({
      category,
      price_washing: priceWashing,
      price_ironing: priceIroning,
      price_dyeing: priceDyeing,
      cost_washing: costWashing,
      cost_ironing: costIroning,
      cost_dyeing: costDyeing,
    });
    try {
      await window.go.service.PriceService.CreatePrice(price);
      setCategory("")
      setPriceWashing("")
      setPriceIroning("")
      setPriceDyeing("")
      setCostWashing("")
      setCostIroning("")
      setCostDyeing("")
      setClearList(true)
    } catch (e) {
      console.error(e)
    }
  }

  const onSearhValue = async () => {
    const data = await window.go.service.PriceService.GetPricesByCategory(100, 0, searchValue);
    setGarments(data)
  }

  return (
    <>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-around"
        alignItems="center" sx={{ mb: 2, mt: 2 }}>
        <TextField id="outlined-basic" label="Nombre de la prenda *" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)} />
        <TextField id="outlined-basic" label="Precio lavado *" variant="outlined" value={priceWashing} onChange={(e) => setPriceWashing(e.target.value)} />
        <TextField id="outlined-basic" label="Precio planchado *" variant="outlined" value={priceIroning} onChange={(e) => setPriceIroning(e.target.value)} />
        <TextField id="outlined-basic" label="Precio tinturado *" variant="outlined" value={priceDyeing} onChange={(e) => setPriceDyeing(e.target.value)} />
        <TextField id="outlined-basic" label="Costo lavado *" variant="outlined" value={costWashing} onChange={(e) => setCostWashing(e.target.value)} />
        <TextField id="outlined-basic" label="Costo planchado *" variant="outlined" value={costIroning} onChange={(e) => setCostIroning(e.target.value)} />
        <TextField id="outlined-basic" label="Costo tinturado *" variant="outlined" value={costDyeing} onChange={(e) => setCostDyeing(e.target.value)} />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-around"
        alignItems="center">
        <Button onClick={addGarment} >Añadir prenda</Button>
      </Stack>
      <Stack>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            Nombre de la prenda
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
        <GarmentsPricesTable
          setGarments={setGarments}
          garments={garments}
          updateTotal={updateTotal}
          setUpdateTotal={setUpdateTotal}
        />
      </div>
    </>
  )
}
