const getConnection = require("./src/database/dB");

(async () => {
  try {
    const connection = await getConnection();
    console.log("Conexión a la base de datos establecida correctamente");
    connection.release();
  } catch (error) {
    console.error("Error al conectar a la base de datos", error);
  }
})();
