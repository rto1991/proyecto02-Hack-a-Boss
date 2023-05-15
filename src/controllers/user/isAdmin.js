"use strict";

const getDB = require("../../database/db");

async function isAdmin(userId) {
  // establecer la conexión a la base de datos
  const connec = await getDB();

  try {
    // ejecutar una consulta para verificar el role del usuario
    const [rows, fields] = await connec.execute(
      "SELECT role FROM users WHERE id = ?",
      [userId]
    );

    // comprobar si el usuario es un administrador
    if (rows.length > 0 && rows[0].role === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    // cerrar la conexión a la base de datos
    await connection.end();
  }
}

module.exports = isAdmin;
