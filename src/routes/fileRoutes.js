const express = require("express");

const {
  makeFolder,
  getCurrentFolder,
  listDirectory,
} = require("../controllers/files");

//estos middles nos hará falta para operar con los ficheros ya que los usuarios han de estar logueados para manejar las rutas
const isUser = require("../middlewares/isUser");
const userExists = require("../middlewares/userExists");

const router = express.Router();

router.get("/makeFolder/:folderName", isUser, makeFolder);
router.get("/getCurrentFolder", isUser, getCurrentFolder);
router.get("/dir", isUser, listDirectory);

module.exports = router;
