"use strict";

const getDB = require("../../database/db");
const fs = require("fs/promises");

const renameFile = async (req, res) => {
  try {
    const userInfo = req.userInfo; // Aquí nos traemos la info del usuario
    const idUser = userInfo.id;
    const { fileName, newFileName } = req.body; // Aquí nos traemos el nombre actual del archivo y el nuevo nombre
    const connect = await getDB();
    const [file] = await connect.query(
      `SELECT * FROM files WHERE fileName = ? and id_user = ?`,
      [fileName, idUser]
    );

    // Si el archivo no existe en la BD, devolver un mensaje de error
    if (file.length === 0) {
      return res.status(404).send(`El archivo ${fileName} no existe`);
    }

    const filePath = file[0].filePath;

    // Actualizar el nombre del archivo en la BD
    await connect.query(
      `UPDATE files SET fileName = ?, filePath = ? WHERE fileName = ? and id_user = ?`,
      [newFileName, filePath.replace(fileName, newFileName), fileName, idUser]
    );

    // Renombrar el archivo físicamente en el sistema de archivos
    await fs.rename(
      process.env.ROOT_DIR + "\\" + idUser + filePath + fileName,
      process.env.ROOT_DIR + "\\" + idUser + filePath + newFileName
    );

    res
      .status(200)
      .send(
        `El archivo ${fileName} se ha renombrado correctamente a ${newFileName}`
      );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al renombrar el archivo");
  }
};

module.exports = renameFile;
