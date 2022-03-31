import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PropTypes from "prop-types";
import MultiSelectUnstyled from "@mui/base/MultiSelectUnstyled";
import { selectUnstyledClasses } from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomMultiSelect = React.forwardRef(function CustomMultiSelect(
  props,
  ref
) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <MultiSelectUnstyled {...props} ref={ref} components={components} />;
});

CustomMultiSelect.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.func,
    Root: PropTypes.elementType,
  }),
};

export default function PrendasComponent({ setGarments }) {
  const [rows, setRows] = React.useState([]);

  function handleClick() {
    let newArr = [
      {
        id: randomId(),
        total: 1,
        category: "",
        gendre: "",
        color: "",
        brand: "",
        price: 0,
        realPrice: 0,
        comment: "",
        defects: [],
      },
    ];
    setRows(rows.concat(newArr));
  }

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    let data = rows.filter((row) => row.id != id);
    setRows(data);
  };

  const handleDefects = (array, id) => {
    let oldArr = rows.filter((row) => row.id !== id);
    let data = rows.filter((row) => row.id === id);
    let row = data[0];
    row.defects = array;
    setRows(oldArr.concat(row));
  };

  const handleOnChange = ({ field, id, props }) => {
    let oldArr = rows.filter((row) => row.id !== id);
    let data = rows.filter((row) => row.id === id);
    let row = data[0];
    if (row.total === 1) {
      row.realPrice = row.price;
    } else {
      row.realPrice = row.price * row.total;
    }
    row[field] = props.value;
    setRows(oldArr.concat(row));
  };

  React.useEffect(() => {
    setGarments(rows);
  }, [rows, setGarments]);

  const imperfecciones = [
    "Roto",
    "Hilos idos",
    "Hombreras",
    "Picado",
    "Mareado",
    "Grasa",
    "Manchado",
    "Decorado",
    "Motas",
    "Quemado",
    "Chafado",
    "Otros",
  ];

  const columns = [
    {
      field: "total",
      headerName: "Cantidad",
      type: "number",
      editable: true,
    },
    { field: "category", headerName: "Categoria", editable: true },
    { field: "gendre", headerName: "Genero", editable: true },
    { field: "color", headerName: "Color", editable: true },
    { field: "brand", headerName: "Marca", editable: true },
    {
      field: "price",
      headerName: "Precio",
      editable: true,
    },
    {
      field: "comment",
      headerName: "Observaciones",
      editable: true,
    },
    {
      field: "defects",
      type: "actions",
      headerName: "Defectos",
      width: 300,
      editable: true,
      getActions: ({ id }) => {
        return [
          <CustomMultiSelect
            defaultValue={[10, 20]}
            onChange={(value) => {
              handleDefects(value, id);
            }}
          >
            {imperfecciones.map((c) => (
              <StyledOption key={c} value={c}>
                {c}
              </StyledOption>
            ))}
          </CustomMultiSelect>,
        ];
      },
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
        onEditCellPropsChange={handleOnChange}
      />
    </>
  );
}
