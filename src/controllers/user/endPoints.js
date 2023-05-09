"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const getConnection = require("../../database/dB");
const sendMail = require("../../service/sendMail");

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

  //Ruta para recuperacion de contraseña
  app.post("/lostPassword", async (req, res) => {
    try {
      const connection = await getConnection();
      const { email } = req.body;
      if (!email) return res.status(400).send("Faltan credenciales");

      //Comprobar que el email existe ne la base de datos
      const [rows] = await connection.query(
        ` SELECT id
          FROM users
          WHERE email=?        
        `,
        [email]
      );

      if (rows.length === 0)
        return res.status(404).send("No hay usuario registrado con ese email");

      //Generamos código de recuperación
      const { v4: uuidv4 } = require("uuid");
      const recoverCode = uuidv4();

      //Actualizamos la base de datos

      await connection.query(
        `
        UPDATE users
        SET recoverCode=?, lastAuthUpdate= ?
        WHERE email=?
        `,
        [recoverCode, new Date(), email]
      );

      //Enviamos el código por email

      const lostMailBody = `
      Se solitó el cambio de contraseña para el usuario registrado con este email en mycloudDrive. El código de 
      recuperación es: ${recoverCode} .
      Si no lo has solicitado puedes hacer login con tu contraseña habitual.
      `;

      const sendGridMail = require("../../service/sendGridMail");
      await sendGridMail(
        email,
        "Cambio de contraseña en mycloudDrive",
        lostMailBody
      );

      connection.release();

      res.status(200).send({
        status: "ok",
        message: "Email enviado",
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });
}

module.exports = { setRoutes };
