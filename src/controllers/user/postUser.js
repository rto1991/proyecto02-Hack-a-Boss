const getDB = require("../../database/db");
const fs = require("fs/promises");

const postUser = async (req, res) => {
  try {
    const { mail, pwd } = req.body;
    const connect = await getDB();

    const [userExist] = await connect.query(
      `SELECT id, date FROM users WHERE email=?`,
      [mail]
    );

    if (userExist.length > 0) {
      return res.status(409).send({
        status: "bad",
        mensaje: "El usuario ya existe",
      });
    }

    /**preparo para mandar mail de confirmacion */
    //primero generamos un codigo de registro con uuidv4
    const { v4: uuidv4 } = require("uuid");
    const regCode = uuidv4();

    /**armamos el body del mail */
    const bodyMail = `
        Te registraste en My Cloud Drive.
        Pulsa el enlace para activar la cuenta: ${process.env.PUBLIC_HOST}${regCode}
        `;
    /**llamo a enviar mail */
    const sendMail = require("../../services/sendMail");
    sendMail(mail, "Correo de verificación My Cloud Drive", bodyMail);

    const [users] = await connect.query(
      //SHA2 es un estandar de cifrado que recibe como parámetro la llave que se utilizara y el número de bits del HASH,
      //de esta forma el valor será cifrado y se almacenará en la base de datos
      //SHA --> Secure Hash Algorithm
      `INSERT INTO users (email, password, regCode) VALUES (?,SHA2(?,512),?)`,
      [mail, pwd, regCode]
    );

    //crear su carpeta personal

    let userId = users.insertId; //obtenemos el id de usuario de la instancia USERS
    //creamos el registro en la BD del fichero inicial de la carpeta ROOT
    const [files] = await connect.query(
      `
    INSERT INTO files (id_user,date_add,date_upd,fileDescription, fileName, is_folder, filePath) VALUES (?,?,?,?,?,?,?)
    `,
      [
        userId,
        new Date(),
        new Date(),
        "Carpeta Root",
        "/",
        1,
        process.env.ROOT_DIR + userId,
      ]
    );

    //creamos la carpeta física en el disco en el direcotorio estático
    await fs.mkdir(process.env.ROOT_DIR + userId);

    let fileId = files.insertId; // obtenemos la ID de fila insertada en la la tabla files, pues necesitamos dicha ID para actualizar el campo currentFolder en la tabla users
    await connect.query(`UPDATE users SET currentFolder_id=? WHERE id=?`, [
      fileId,
      userId,
    ]);

    //liberamos la conexión usada
    connect.release();

    return res.status(200).send({
      status: "ok",
      mensaje: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = postUser;
