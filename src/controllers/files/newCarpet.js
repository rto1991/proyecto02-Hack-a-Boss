'use estrict';

const newCarpet = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'En pruebas'
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    newCarpet,
}