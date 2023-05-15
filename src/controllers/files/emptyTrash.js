"use strict";

const emptyTrash = async (req, res) => {
  try {
    const idUser = req.userInfo.id;
    const connect = await getDB();
    const [files] = await connect.query(
      `SELECT * FROM files WHERE id_user = ? AND in_recycle_bin = 1`,
      [idUser]
    );
    const recycleBinPath = path.join(__dirname, "../uploads/recycle_bin");
    for (const file of files) {
      const filePath = path.join(recycleBinPath, file.filePath, file.fileName);
      await fs.rm(filePath, { force: true });
    }
    await connect.query(
      `UPDATE files SET in_recycle_bin = 0 WHERE id_user = ?`,
      [idUser]
    );
    res.status(200).send(`La papelera se ha vaciado correctamente.`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error al vaciar la papelera.`);
  }
};

module.exports = emptyTrash;
