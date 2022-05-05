import * as React from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Button, TextField, Autocomplete } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PropTypes from "prop-types";
import SelectUnstyled from "@mui/base/SelectUnstyled";
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
  min-width: 250px;
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
  min-width: 100px;
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
const CustomSelect = React.forwardRef(function CustomMultiSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
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

// aqui esta el componente
export default function PrendasComponent({
  setGarments,
  garments,
  updateTotal,
  setUpdateTotal,
  garmentsData,
  setGarmentsData,
}) {
  // const [rows, setRows] = React.useState(garments);


  React.useEffect(() => {
    setUpdateTotal(false);
    handleTotal();
  }, [updateTotal]);

  React.useEffect(() => {
    const fetchGarments = async () => {
      const data = await window.go.service.PriceService.GetPrices();
      setGarmentsData(data);
    };
    fetchGarments();
  }, []);

  function handleClick() {
    let newArr = [
      {
        id: randomId(),
        cuantity: 1,
        category: "",
        gendre: "",
        color: "",
        brand: "",
        price: 0,
        realTotal: 0,
        comment: "",
        service: "",
        defects: [],
      },
    ];
    setGarments(garments.concat(newArr));
  }

  function handleTotal() {
    let row = garments.map((item) => {
      return {
        ...item,
        realTotal: parseInt(item.cuantity) * parseInt(item.price.replace('.', '')),
      };
    });
    setGarments(row);
  }

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();

    let data = garments.filter((row) => row.id !== id);
    setGarments(data);
  };

  const handleDefects = (array, id) => {
    // let oldArr = garments.filter((row) => row.id !== id);
    // let data = garments.filter((row) => row.id === id);
    // let row = data[0];
    // row.defects = array;
    // setGarments(oldArr.concat(row));

    let row = garments.map((item) => {
      if (item.id === id)
        return {
          ...item,
          defects: array,
        };
      return {
        ...item,
      };
    });
    setGarments(row);
  };

  const handleService = async (service, id) => {
    let row = garments.map((item) => {
      if (item.id === id) {
        let price = garmentsData.filter(
          (garment) => garment.category === item.category
        );
        return {
          ...item,
          service,
          price:
            service === "Lavado"
              ? price[0].price_washing
              : price[0].price_ironing,
        };
      }

      return {
        ...item,
      };
    });
    setGarments(row);
  };

  const handleGenre = (ev, value, reason, details, id) => {
    let row = garments.map((item) => {
      if (item.id === id && value) {
        return {
          ...item,
          gendre: value,
        };
      }
      return {
        ...item,
      };
    });
    setGarments(row);
  }

  const handleAutocomplete = (ev, value, reason, details, id) => {
    let row = garments.map((item) => {
      if (item.id === id && value) {
        let category = garmentsData.filter(
          (garment) => garment.category === value
        );

        let price = 0;

        if (item.service === "Lavado" && item.service) {
          price = category[0].price_washing;
        } else if (item.service === "Planchado" && item.service) {
          price = category[0].price_ironing;
        } else {
          price = 0;
        }
        return {
          ...item,
          category: value,
          price,
        };
      }

      return {
        ...item,
      };
    });
    setGarments(row);
  };

  const handleOnChange = ({ field, id, props }) => {
    // let oldArr = garments.filter((row) => row.id !== id);
    // let data = garments.filter((row) => row.id === id);
    // let row = data[0];
    // row[field] = props.value;
    // setGarments(oldArr.concat(row));

    let row = garments.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: props.value,
        };
      }
      return {
        ...item,
      };
    });

    setGarments(row);
  };

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

  const genre = ["Caballero", "Dama", "Unisex"]

  const service = ["Lavado", "Planchado"];

  const columns = [
    {
      field: "cuantity",
      headerName: "Cantidad",
      type: "string",
      editable: true,
    },
    {
      field: "category",
      headerName: "Categoria",
      width: 300,
      type: "actions",
      getActions: ({ id }) => {
        return [
          <Autocomplete
            sx={{ width: 300 }}
            options={garmentsData.map((garment) => garment.category)}
            onChange={(ev, value, reason, details) => {
              handleAutocomplete(ev, value, reason, details, id);
            }}
            renderInput={(params) => <TextField {...params} />}
          />,
        ];
      },
    },
    // {
    //   field: "gendre",
    //   headerName: "Genero",
    //   editable: true,
    //   type: "singleSelect",
    //   valueOptions: ["Caballero", "Dama", "Unisex"],
    // },
    {
      field: "gendre",
      headerName: "Genero",
      editable: true,
      width: 300,
      type: "actions",
      getActions: ({ id }) => {
        return [
          <Autocomplete
            sx={{ width: 300 }}
            options={genre.map((garment) => garment)}
            onChange={(ev, value, reason, details) => {
              handleGenre(ev, value, reason, details, id);
            }}
            renderInput={(params) => <TextField {...params} />}
          />,
        ];
      },
    },
    { field: "color", headerName: "Color", editable: true },
    { field: "brand", headerName: "Marca", editable: true },
    {
      field: "service",
      headerName: "Servicio",
      width: 250,
      type: "actions",
      getActions: ({ id }) => {
        return [
          <CustomSelect
            onChange={async (value) => {
              await handleService(value, id);
            }}
          >
            {service.map((c) => (
              <StyledOption key={c} value={c}>
                {c}
              </StyledOption>
            ))}
          </CustomSelect>,
        ];
      },
    },
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
            experimentalFeatures={{ newEditingApi: true }}
            onCellEditStop={(params, event) => {
              if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                event.defaultMuiPrevented = true;
              }
            }}
          />,
        ];
      },
    },
  ];

  return (
    <>
      {" "}
      <Button onClick={() => handleClick()}>Añadir prenda</Button>
      <Button onClick={() => handleTotal()}>Calcular Total</Button>
      <DataGrid
        rows={garments}
        columns={columns}
        onEditCellPropsChange={handleOnChange}
      />
    </>
  );
}
