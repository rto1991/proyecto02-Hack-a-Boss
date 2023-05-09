'use estrict';

const { listFiles } = require('./listFiles');
const { newCarpet } = require('./newCarpet');
const { deleteFile } = require('./deleteFile');

module.exports = {
    listFiles,
    newCarpet,
    deleteFile,
};