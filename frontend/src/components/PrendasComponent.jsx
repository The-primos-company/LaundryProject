import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomId,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export default function IsCellEditableGrid() {
  const [rows, setRows] = React.useState([
    {
      id: randomId(),
      cantidad: 2,
      tipo: "pantalon",
      genero: "caballero",
      color: "azul",
      marca: "Hugo Bross",
      precio: 14000,
    },
  ]);

  function handleClick() {
    let newArr = [
      {
        id: randomId(),
        cantidad: 1,
        tipo: "",
        genero: "",
        color: "",
        marca: "",
        precio: 0,
      },
    ];
    setRows(rows.concat(newArr));
  }

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    let data = rows.filter((row) => row.id != id);
    setRows(data);
  };

  const columns = [
    {
      field: "cantidad",
      headerName: "Cantidad",
      type: "number",
      editable: true,
    },
    { field: "tipo", headerName: "Tipo", editable: true },
    { field: "genero", headerName: "Genero", editable: true },
    { field: "color", headerName: "Color", editable: true },
    { field: "marca", headerName: "Marca", editable: true },
    {
      field: "precio",
      headerName: "Precio",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Accion",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={handleDeleteClick(id)}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      {" "}
      <Button onClick={() => handleClick()}>Añadir prenda</Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </>
  );
}
