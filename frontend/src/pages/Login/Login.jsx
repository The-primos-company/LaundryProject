import React, { useState, useEffect, useContext } from "react";
import {
  Stack,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { RouterContext } from "../../context/RouterContext";

export const Login = () => {
  const [user, setUser] = useState("admin");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
const { setRoute } = useContext(RouterContext)



  const onHandleLogin = () => {
    if (user === "admin" && password === "adminlavasur2022") {
      setAuth({
        ...auth,
        role: "admin",
        user: "Administrador",
        isLogged: true,
      });
      setRoute("create-order")
    } else if (user === "operator" && password === "operador2022") {
      setAuth({
        ...auth,
        role: "operator",
        user: "Operario",
        isLogged: true,
      });
      setRoute("create-order")
    }
  };

  return (
    <Stack sx={{height:'90vh'}} justifyContent='center'>
      <Stack spacing={2} alignItems="center"  sx={{ marginTop: 2 }}>
        <Stack spacing={2}>
          <Typography align={"center"} variant={"h5"}>
            INICIAR SESIÓN
          </Typography>
          <Select
            value={user}
            label="Usuario"
            onChange={(event) => setUser(event.target.value)}
          >
            <MenuItem value={"admin"}>Administrador</MenuItem>
            <MenuItem value={"operator"}>Operario</MenuItem>
          </Select>
          <TextField
            label="Contraseña"
            value={password}
            require={true}
            type={'password'}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button sx={{marginTop:2}} onClick={onHandleLogin}>Acceder</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
