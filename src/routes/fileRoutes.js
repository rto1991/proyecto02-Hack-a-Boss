"use strict";

/*
Fichero de rutas para el manejo de carpetas y archivos, en el usamos el Router de Express para hacer las rutas que llamarán a los endpoints traidos de los controllers
Middlewares usados: isUser
*/
const express = require("express");

//requerimos los ficheros de endpoints guardados en al carpeta "files" de "controllers", al tener un archivo INDEX, éste retorna todos los módulos necesarios
const {
  makeFolder,
  getCurrentFolder,
  listDirectory,
  changeDirectory,
  deleteDirectory,
  renameDirectory,
  moveFile,
  deleteFile,
  downloadFile,
  renameFile,
  moveToTrash,
} = require("../controllers/files");

//estos middles nos hará falta para operar con los ficheros ya que los usuarios han de estar logueados para manejar las rutas
const isUser = require("../middlewares/isUser");
//const userExists = require("../middlewares/userExists");

const router = express.Router();

router.get("/makeFolder/:folderName", isUser, makeFolder);
router.get("/getCurrentFolder", isUser, getCurrentFolder);
router.get("/dir", isUser, listDirectory);
router.get("/cd/:destinationDirectory", isUser, changeDirectory);
router.get("/rd/:directoryToDelete", isUser, deleteDirectory);
router.get("/renameDirectory", isUser, renameDirectory);
router.post("/moveFile", moveFile);
router.delete("/files/:fileName", deleteFile);
router.get("/download/:fileName", downloadFile);
router.post("/files/:filesId", renameFile);
router.post("/files/:parentDirId/:fileName/moveToTrash", moveToTrash);

module.exports = router;
