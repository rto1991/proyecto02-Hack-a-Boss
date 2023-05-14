"use strict";

"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const moveToTrash = async (req, res) => {
  try {
    // Definimos las constantes necesarias para realizar la operación
    const fileInfo = req.params; // Aquí nos traemos la información del archivo a mover a la papelera
    const idUser = req.userInfo.id;
    const connect = await getDB();
    const [file] = await connect.query(
      `SELECT * FROM files WHERE fileName = ? AND id_user = ? AND parent_dir_id = ?`,
      [fileInfo.fileName, idUser, fileInfo.parentDirID]
    );

    // Verificar si el archivo ya se encuentra en la papelera
    if (file[0].in_recycle_bin === 1) {
      return res
        .status(400)
        .send(
          `El archivo ${fileInfo.fileName} ya se encuentra en la papelera.`
        );
    }

    const filePath = file[0].filePath;

    // Actualizar el estado del archivo en la base de datos
    await connect.query(
      `UPDATE files SET in_recycle_bin = ? WHERE fileName = ? AND id_user = ? AND parent_dir_id = ?`,
      [1, fileInfo.fileName, idUser, fileInfo.parentDirID]
    );

    // Enviamos respuesta de que la operación finalizó correctamente
    res
      .status(200)
      .send(
        `El archivo ${fileInfo.fileName} se ha movido a la papelera correctamente.`
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(`Error al mover el archivo ${fileInfo.fileName} a la papelera.`);
  }
};

module.exports = moveToTrash;
