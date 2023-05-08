"use strict";

const express = require("express");
require("dotenv").config();
const { setRoutes } = require("./src/controllers/user/endPoints");
const getConnection = require("./src/database/dB");
const morgan = require("morgan");

// Inicializar la aplicación de Express
const app = express();

//Middleware para manejar JSON

app.use(express.json());

// Iniciamos morgan

app.use(morgan("dev"));

//Llamamos a la función que establece las rutas

setRoutes(app);

//Establecemos conexión a la base de datos
getConnection();

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
