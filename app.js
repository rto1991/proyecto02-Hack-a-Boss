'use strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const { newUser, getUser, loginController } = require('./src/controllers/users');
const { listFiles, newCarpet, deleteFile} = require('./src/controllers/files');
const app = express();
// este es el primer middleware por donde pasa
app.use(morgan('dev'));
app.use(express.json());

// Controllers user
app.post('/user', newUser);
app.post('/login', loginController);
app.get('/:id', getUser);

// Controllers files
app.get('/user/list', listFiles);
app.post('/', newCarpet);
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


