const {body} = require('express-validator');
const db = require('../../database/models/')
module.exports = [
    body('firstName').notEmpty().withMessage('Ingrese su nombre'),
    body('lastName').notEmpty().withMessage('Ingrese su apellido'),
    body('email')
        .notEmpty().withMessage('Ingrese su e-mail').bail()
        .isEmail().withMessage('Ingrese un e-mail válido')
        .custom(async value =>{
            /* Revisa si hay un usuario con el mismo email*/
            try {
                let userEmail = await db.User.findOne({where:{email: value}})
                if(userEmail){
                    throw new Error('El e-mail se encuentra en uso')
                }else{
                    return true
                }  
            } catch (error) {
                throw error
            }
        }), 
    body('username')
        .notEmpty().withMessage('Ingrese un usuario').bail()
        .isLength({min: 5}).withMessage('El usuario debe tener al menos 5 caracteres').bail()
        .custom(async value =>{
            /* Revisa si hay un usuario con el username*/
            try {
                let user = await db.User.findOne({where:{username: value}})
                console.log(user);
                if(user != null){
                    throw new Error('El nombre de usuario se encuentra en uso')
                }else{
                    return true
                }
            } catch (error) {
                throw error
            }
        }),
    body('password')
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña  debe tener al menos 8 caracteres'),
    body('passwordConfirm')
        .notEmpty().withMessage('Debe confirmar su contraseña').bail()
        .custom((value, {req}) => {
            /* Confirma si las contraseñas son iguales*/
            if (value !== req.body.password) {
                return false;
            }
            return true;
        }).withMessage('Las contraseñas deben ser iguales'),
]