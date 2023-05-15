"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");
const path = require("path");

const recoverFile = async (req, res) => {
  try {
    // Obtenemos la información del archivo a recuperar de los parámetros de la solicitud
    const fileInfo = req.params;
    const idUser = req.userInfo.id;

    // Nos conectamos a la base de datos y buscamos el archivo a recuperar
    const connect = await getDB();
    const [file] = await connect.query(
      `SELECT * FROM files WHERE fileName = ? AND id_user = ? AND parent_dir_id = ?`,
      [fileInfo.fileName, idUser, fileInfo.parentDirID]
    );

    // Verificamos si el archivo ya está fuera de la papelera
    if (file[0].in_recycle_bin === 0) {
      return res
        .status(400)
        .send(
          `El archivo ${fileInfo.fileName} ya se encuentra fuera de la papelera.`
        );
    }

    // Actualizamos el estado del archivo en la base de datos
    await connect.query(
      `UPDATE files SET in_recycle_bin = ? WHERE fileName = ? AND id_user = ? AND parent_dir_id = ?`,
      [0, fileInfo.fileName, idUser, fileInfo.parentDirID]
    );

    // Enviamos una respuesta al cliente indicando que la operación se realizó correctamente
    res
      .status(200)
      .send(`El archivo ${fileInfo.fileName} se ha recuperado correctamente.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error al recuperar el archivo ${fileInfo.fileName}.`);
  }
};

module.exports = recoverFile;
