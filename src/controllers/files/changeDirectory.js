"use strict";

/*Este controlador hará el cambio de directorio actual almacenado en la tabla "users", el directorio de destino vendrá por "param", los valores posibles son
".." <-- retornamos al directorio anterior
[nombreCarpeta] <-- entramos en la carpeta nombrada
Cualquier otro parámetro lanzará un error como "Directorio inexistente"

RUTA /cd
METODO: GET
Middlewares usados: isUser (comprueba si el usuario está logueado y tiene un token válido) en otro caso lanzará un error de autenticación
*/

const getDB = require("../../database/db");

const getCurrentFolder = async (req, res) => {
  try {
    const userInfo = req.userInfo;
    const idUser = userInfo.id;
    const connect = await getDB();
    //obtenemos el path actual donde se encuentra el usuario
    const pathUser = await connect.query(
      `
    SELECT f.filename FROM users u INNER JOIN files f ON f.id = u.currentFolder_id WHERE u.id = ?`,
      [idUser]
    );

    res
      .status(200)
      .send(`El directorio actual es "${pathUser[0][0].filename}"`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getCurrentFolder;
