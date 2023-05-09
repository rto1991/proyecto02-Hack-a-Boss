"use strict";

const getConnection = require("../database/dB");

const userExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const { user } = await connection.query(
      `
            SELECT id
            FROM users 
            WHERE id
            `,
      [id]
    );

    if (user.length === 0) {
      return res.status(404).send("No existe el usuario");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { userExist };
