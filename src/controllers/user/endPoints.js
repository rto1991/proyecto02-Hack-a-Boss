"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");

// Configurar express para que pueda procesar solicitudes JSON y definimos rutas
function setRoutes(app) {
  app.use(express.json());

  // Ruta para crear un usuario

  app.post("/registro", async (req, res) => {
    const { name, email, password } = req.body;

    // Verificar que se proporcionan todos los datos necesarios
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ error: "Falta información requerida para el registro" });
      return;
    }

    // Verificar si el usuario ya existe en la base de datos
    const query = `SELECT * FROM users WHERE email = ?`;

    try {
      const connection = await getConnection(); // Obtener la conexión a la base de datos
      const [resultUser] = await connection.execute(query, [email]);
      if (resultUser.length > 0) {
        res.status(409).json({ error: "El usuario ya existe" });
        return;
      }

      // Insertar el nuevo usuario en la base de datos
      const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      const [user] = await connection.execute(insertQuery, [
        name,
        email,
        password,
      ]);
      res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  // Ruta para login

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      // Verificar las credenciales del usuario en la base de datos
      const connection = await getConnection();
      const [user] = await connection.execute(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password]
      );

      if (user.length === 0) {
        res.status(403).json({ error: "Credenciales inválidas" });
      } else {
        // Generara un token si las credenciales son válidas
        const info = {
          id: user[0].id,
          role: user[0].role,
        };
        const token = jwt.sign(info, process.env.SECRET_TOKEN, {
          expiresIn: "1d",
        });

        res.status(200).send({
          message: "Inicio de sesión exitoso",
          data: {
            token,
          },
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
}
module.exports = { setRoutes };
