"use stricit";

const mysql = require("mysql2/promise");
require("dotenv").config();

// Configuración de la conexión a la base de datos
const { HOST, USER, PASSWORD, DATABASE } = process.env;

const pool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

// Función para obtener la conexión a la base de datos
async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error("Error al obtener la conexión a la base de datos", error);
    throw error;
  }
}

module.exports = getConnection;
