'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const chalk = require('chalk');
const { newUser, getUser, loginController } = require('./src/controllers/users');
const { listFiles, newCarpet, deleteFile} = require('./src/controllers/files');
const { validateUser } = require('./src/middlewares/validateUser');
const { createFile } = require('./src/database/createFile');
const app = express();
// este es el primer middleware por donde pasa
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());

// Controllers user
app.post('/user', newUser); // listo ✅ (Permite el registro del usuario - email en pruebas)
app.post('/login', loginController); // listo ✅ (Permite el login de usuarios registrados con validación de token)
app.get('/login/:id', getUser); // (Permite la modificacion de los datos del usuario - de momento solo lista la información)

// Controllers files
app.get('/id/list', listFiles); // (Permite listar los archivos del usuario)
app.post('/', validateUser, createFile, newCarpet); /* en vías de desarrollo */ // (Permite agregar archivos a usuarios validados)
app.delete('/file/id', deleteFile); // (Permite eliminar los archivos del usuario)

// Middleware para rutas no definidas
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',

    });
});


app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});


// Puerto
app.listen(3000, () => {
    console.log(chalk.yellow((`Servidor funcionando 👍🏼`)));
    });


