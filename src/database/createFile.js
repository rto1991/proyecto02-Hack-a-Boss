'use estrict';

const { getConnection } = require('./getConnection');

const createFile = async (req, res, next) => {
    
    const { id_probando, fileName, email } = req.body;   
    let connection;
    
    try {
        connection = await getConnection();

        await connection.query(
            `INSERT INTO probando2 (id_probando, fileName) WHERE email=?`,
            [id_probando, fileName, email]
        );

        connection.release();

        res.status(200).send({
            status: 'ok',
            message: 'Carpeta guardada en bbdd correctamente',
            data:{
                id_probando,
                fileName,
                email
            }
        });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports = {
    createFile,
}