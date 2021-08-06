const {body} = require('express-validator');
const {findByField} = require('../../models/user');

module.exports = [
    body('firstName').notEmpty().withMessage('Ingrese su nombre'),
    body('lastName').notEmpty().withMessage('Ingrese su apellido'),
    body('email')
        .notEmpty().withMessage('Ingrese su e-mail').bail()
        .isEmail().withMessage('Ingrese un e-mail válido').bail()
        .custom(value =>{
            /* Revisa si hay un usuario con el mismo email*/
            if(findByField('email',value)){
                throw new Error('El e-mail ya se encuentra en uso');
            }
            return true
        }),
    body('username')
        .notEmpty().withMessage('Ingrese un usuario').bail()
        .isLength({min: 5}).withMessage('El usuario debe tener al menos 5 caracteres').bail()
        .custom(value =>{
            /* Revisa si hay un usuario con el username*/
            if(findByField('username',value)){
                throw new Error('El nombre de usuario ya esta en uso');
            }
            return true
        }),
    body('password')
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña  debe tener al menos 8 caracteres'),
    body('passwordConfirm')
        .notEmpty().withMessage('Debe confirmar su contraseña').bail()
        .custom((value, {req}) => {
            /* Confirma si las contraseñas son iguales*/
            if (value !== req.body.password) {
                throw new Error('Las contraseña no son iguales ');
            }
            return true;
        }),
]