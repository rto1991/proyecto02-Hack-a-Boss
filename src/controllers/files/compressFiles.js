"use strict";

const fs = require("fs-extra");
const archiver = require("archiver");
const path = require("path");

const compressFiles = async (req, res) => {
  try {
    const { fileList, destinationFileName } = req.body;

    // Verifica si se proporcionaron archivos para comprimir
    if (!fileList || fileList.length === 0) {
      return res
        .status(400)
        .send("No se proporcionaron archivos para comprimir.");
    }

    // Verifica si se proporcionó un nombre de archivo de destino
    if (!destinationFileName) {
      return res
        .status(400)
        .send("No se proporcionó un nombre de archivo de destino.");
    }

    // Crea un archivo temporal para guardar el archivo comprimido
    const tempFilePath = path.join(__dirname, "temp", destinationFileName);

    // Crea un objeto Archiver y establece el formato de compresión
    const output = fs.createWriteStream(tempFilePath);
    const archive = archiver("gzip", {
      zlib: { level: 9 }, // Establece el nivel de compresión máximo
    });

    // Adjunta el archivo comprimido al flujo de salida
    archive.pipe(output);

    // Agrega cada archivo de la lista al archivo comprimido
    for (const file of fileList) {
      const filePath = path.join(__dirname, "uploads", file); // Ajusta la ruta del directorio de los archivos a comprimir según tu estructura
      const fileName = path.basename(filePath);
      archive.file(filePath, { name: fileName });
    }

    // Finaliza la creación del archivo comprimido
    await archive.finalize();

    // Envía el archivo comprimido como respuesta
    res.download(tempFilePath, destinationFileName, () => {
      // Elimina el archivo temporal después de enviarlo
      fs.remove(tempFilePath);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrió un error al comprimir los archivos.");
  }
};

module.exports = compressFiles;
