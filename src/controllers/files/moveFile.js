"use strict";

const fs = require("fs");
const path = require("path");
const getDB = require("../../database/db");

const moveFile = async (req, res) => {
  try {
    const { fileId, newFolderPath } = req.body;
    const userInfo = req.userInfo;
    const idUser = userInfo.id;

    const connect = await getDB();

    // Verificar si el archivo pertenece al usuario actual
    const [file] = await connect.query(
      `SELECT * FROM files WHERE id = ? AND id_user = ? AND in_recycle_bin = 0`,
      [fileId, idUser]
    );

    if (!file) {
      return res.status(404).send({ error: "Archivo no encontrado" });
    }

    // Verificar si la nueva carpeta existe y pertenece al usuario actual
    const [newFolder] = await connect.query(
      `SELECT * FROM files WHERE filename = ? AND id_user = ? AND is_folder = 1 AND in_recycle_bin = 0`,
      [newFolderPath, idUser]
    );

    if (!newFolder) {
      return res.status(404).send({ error: "Carpeta no encontrada" });
    }

    // Mover el archivo a la nueva carpeta
    const oldPath = file.filePath;
    const newFileName = path.basename(oldPath);
    const newPath = path.join(newFolder.filePath, newFileName);

    fs.rename(oldPath, newPath, async function (err) {
      if (err) {
        console.log("Error al mover archivo: " + err);
        return res.status(500).send({ error: "Error al mover archivo" });
      } else {
        console.log("Archivo movido exitosamente.");
        await connect.query(
          `UPDATE files SET parent_dir_id = ?, date_upd = NOW() WHERE id = ?`,
          [newFolder.id, fileId]
        );
        return res.status(200).send({ message: "Archivo movido exitosamente" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
};

module.exports = moveFile;
