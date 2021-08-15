const {body} = require('express-validator');
const db = require('../../database/models/');

module.exports = [
    body('firstName').notEmpty().withMessage('Ingrese un nuevo nombre'),
    body('lastName').notEmpty().withMessage('Ingrese un nuevo apellido'),
    body('email')
        .notEmpty().withMessage('Ingrese su nuevo e-mail').bail()
        .isEmail().withMessage('Ingrese un e-mail válido')
        .custom(async (value, {req}) =>{
            /* Revisa si hay un usuario con el mismo email*/
            try {
                let user = await db.User.findByPk(req.params.id)
                let userEmail = await db.User.findOne({where:{email: value}})
                if(userEmail && userEmail==user.email){
                    throw new Error('Este e-mail se encuentra en uso')
                }else{
                    return true
                }  
            } catch (error) {
                throw error
            }
        }), 
    body('username')
        .notEmpty().withMessage('Ingrese un nuevo nombre de usuario').bail()
        .isLength({min: 5}).withMessage('El usuario debe tener al menos 5 caracteres').bail()
        .custom(async (value, {req}) =>{
            /* Revisa si hay un usuario con el username*/
            try {
                let user = await db.User.findByPk(req.params.id)
                let userName = await db.User.findOne({where:{username: value}})
                if(userName != null && userName==user.username){
                    throw new Error('El nombre de usuario se encuentra en uso')
                }else{
                    return true
                }
            } catch (error) {
                throw error
            }
        }),
    body('password')
        .custom((value, {req}) =>{
            // Solo si la contraseña tiene valores entre 1 y 8 aparece un arror de caracteres minimos
            // Si se deja vacio se conserva la contraseña del usuario
            console.log(value)
            if(value.length>0 && value.length <8){
                throw new Error('El nombre de usuario se encuentra en uso')
            } else {
                return true
            }
        }),
    body('passwordConfirm')
        .custom((value, {req}) => {
            /* Confirma si las contraseñas son iguales*/
            if (value !== req.body.password) {
                return false;
            }
            return true;
        }).withMessage('Las contraseñas deben ser iguales'),
]