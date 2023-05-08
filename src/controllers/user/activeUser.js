"use strict";

const { log } = require("console");
const getConnection = require("../../database/dB");

// Creamos la validacioón de usuario en dos pasos

const activeUser = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const connection = await getConnection();

    const { userExist } = await connection.query(
      `SELECT id, date FROM users WHERE email=?`,
      [email]
    );

    if (userExist.length > 0) {
      return res.status(409).send({
        message: "El usuario ya existe",
      });
    }

    // Genenramos un código de registro
    const { v4: uuidv4 } = require("uuid");
    const regCode = uuidv4();

    //Creamos el email de confirmación

    const bodyMail = `
    Te damos la bienvenida a myclouddrive. 
    Para activar tu cuenta pincha en el siguiente enlace: ${process.env.PUBLIC_HOST}${regCode}
    `;

    //Requerimos sendMail y enviamos el correo
    const sendMail = require("../../service/sendMail");
    sendMail(email, "VERIFICACIÓN DE USUARIO MYCLOUDDRIVE", bodyMail);

    const { users } = await connection.query(
      `
        INSERT INTO users (email,password, regCode) VALUES (?,SHA2(?,256),?)
    
    `[(email, password, regCode)]
    );

    connection.release();

    return res.status(200).send({
      status: "ok",
      message: "Usuario validado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
