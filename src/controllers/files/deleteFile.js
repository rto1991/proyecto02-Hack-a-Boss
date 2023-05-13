"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const deleteFile = async (req, res) => {
  try {
    // Definimos las constantes necesarias para realizar la operación
    const fileInfo = req.params; // Aquí nos traemos la información del archivo a borrar
    const idUser = req.userInfo.id;
    const connect = await getDB();
    const [file] = await connect.query(
      `SELECT * FROM files WHERE fileName = ? AND id_user = ? AND parent_dir_id = ?`,
      [fileInfo.fileName, idUser, fileInfo.parentDirID]
    );
    const filePath = file[0].filePath;

    // Borramos el archivo en la base de datos
    await connect.query(
      `DELETE FROM files WHERE fileName = ? AND id_user = ? AND parent_dir_id = ?`,
      [fileInfo.fileName, idUser, fileInfo.parentDirID]
    );

    // Borramos el archivo físicamente en el sistema de archivos
    await fs.unlink(path.join(process.env.ROOT_DIR, idUser, filePath));

    // Enviamos respuesta de que la operación finalizó correctamente
    res
      .status(200)
      .send(`El archivo ${fileInfo.fileName} se borró correctamente.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error al borrar el archivo ${fileInfo.fileName}.`);
  }
};

module.exports = deleteFile;
