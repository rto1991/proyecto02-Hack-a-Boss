'use estrict';

const { getUserEmail } = require('../../database/getUserEmail');
const bcrypt = require('bcrypt');

const loginController = async (req, res, next) =>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw Error('Debe introducir un email y password obligatorios', 403);
        }
        


        const user = await getUserEmail(email);

        console.log(user);
        
        res.send({
            status: 'error',
            message: 'En pruebas'
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    loginController,
}