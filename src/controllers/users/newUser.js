'use strict';
const { newError} = require('../../../helps');
const { registerNewUser } = require('../../database');
// getConnection
// const { sendMail } = require('../../services/sendMail');
// const {v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const users = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().pattern(new RegExp(`^[a-zA-Z0-9]{3,30}$`)),
    })

const newUser = async (req, res, next) =>{
    try {
        const {email, password} = req.body;
        // const connect = await getConnection();
        // espero la validación del Joi
        await users.validateAsync(req.body)

        if (!email || !password) {
            throw newError('Usuario y claves obligatorios', 411);
         }

        if (email && password) {
            const validation = users.validate(email)
            // Aquí dentro verifico está correcto, si no emito error.
        if (validation.error) {
         console.log('Debe introducir un email@correcto y una Password1 válida');
         }
        }

        const id = await registerNewUser(email, password);
        console.log(id);
        /*
        // genero regCode
        const regCode = uuidv4();
        
        Validar el envío de email...

        // Mando un mail al usuario con el link de confirmación de email
        const emailBody = `
          Acabas de registrarte correctamente en tu ☁️⎨Disco duro ONLINE⎬☁️. 
          Pulsa en este link para validar tu nuevo email: ${process.env.PUBLIC_HOST}${regCode}
        `;
  
        await sendMail(email, 'Confirma tu registro', emailBody);

        const [ proband ] = await connect.query(
            `INSERT INTO probando (email, password, regCode) VALUES (?,SHA2(?,512),?)`,[email,password,regCode]
        )
        
        connect.release();
            */
        res.send({
            status: 'ok',
            message: `Usuario creado con id: ${id}`
        })
    } catch (error) {
        next(error)
    }
    };


module.exports = {
    newUser,
}