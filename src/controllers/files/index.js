"use strict";

/*
El fichero INDEX es el primero que se llama cuando requerimos una carpeta directamente en cualquier módulo, en él se requiren los modulos por separado y son exportados
para su uso en el fichero de rutas fileRoutes.js
*/

const makeFolder = require("./makeFolder");
const getCurrentFolder = require("./getCurrentFolder");
const listDirectory = require("./listDirectory");
const changeDirectory = require("./changeDirectory");
const deleteDirectory = require("./deleteDirectory");
const emptyTrash = require("./emptyTrash");
const makeFolder = require("./makeFolder");
const moveFile = require("./moveFile");
const moveToTrash = require("./moveToTrash");
const renameDirectory = require("./renameDirectory");
const renameFile = require("./renameFile");
const recoverFile = require("./recoverFile");
const donwloadFile = require("./donwloadFile");

module.exports = {
  makeFolder,
  getCurrentFolder,
  listDirectory,
  changeDirectory,
  deleteDirectory,
  emptyTrash,
  makeFolder,
  moveFile,
  moveToTrash,
  renameDirectory,
  renameFile,
  recoverFile,
  donwloadFile,
};
