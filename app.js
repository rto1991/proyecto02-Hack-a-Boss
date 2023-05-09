"use strict";

const express = require("express");
require("dotenv").config();
const { setRoutes } = require("./src/controllers/user/endPoints");
const getConnection = require("./src/database/dB");
const morgan = require("morgan");
const { userExist } = require("./src/middelwares/userExists");

// Inicializar la aplicación de Express
const app = express();

//Middleware para manejar JSON

app.use(express.json());

// Iniciamos morgan

app.use(morgan("dev"));

// const createDb = require("./src/database/createDb");

//Establecemos conexión a la base de datos
getConnection();

//Llamamos a la función que establece las rutas

setRoutes(app);

//Middleware que comprueba si existe usuario
// userExist(); DA ERROR EN EL ARCHIVO linea 7 (req.params)

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
