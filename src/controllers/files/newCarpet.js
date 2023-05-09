'use estrict';


const newCarpet = async (req, res, next) => {
    try {
        res.send({
            status: 'ok',
            message: 'Usuario validado correctamente'
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    newCarpet,
}