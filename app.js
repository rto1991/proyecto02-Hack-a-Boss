'use strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const { newUser, getUser, loginController } = require('./src/controllers/users');
const { listFiles, newCarpet, deleteFile} = require('./src/controllers/files');
const { validateUser } = require('./src/middlewares/validateUser');
const app = express();
// este es el primer middleware por donde pasa
app.use(morgan('dev'));
app.use(express.json());

// Controllers user
app.post('/user', newUser); // listo
app.post('/login', loginController); // listo
app.get('/login/:id', getUser); 

// Controllers files
app.get('/user/list', listFiles);
app.post('/', validateUser, newCarpet); /* en vías de desarrollo */
app.delete('/file/id', deleteFile);

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


