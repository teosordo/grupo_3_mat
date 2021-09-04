const {body} = require('express-validator');
const db = require('../../database/models/');

module.exports = [
    body('firstName')
        .notEmpty().withMessage('Debes ingresar tu nombre').bail()
        .isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastName')
        .notEmpty().withMessage('Debes ingresar tu apellido').bail()
        .isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Debes ingresar tu e-mail').bail()
        .isEmail().withMessage('Debes ingresar un e-mail válido').bail()
        .custom(async value =>{
            /* Revisa si hay un usuario con el mismo email*/
            try {
                let userEmail = await db.User.findOne({where:{email: value}})
                if(userEmail){
                    throw new Error('Este e-mail ya se encuentra en uso')
                }else{
                    return true
                }  
            } catch (error) {
                throw error
            }
        }), 
    body('username')
        .notEmpty().withMessage('Debes ingresar un nombre de usuario').bail()
        .isLength({min: 5}).withMessage('El nombre de usuario debe tener al menos 5 caracteres')
        .custom(async value =>{
            /* Revisa si hay un usuario con el username*/
            try {
                let user = await db.User.findOne({where:{username: value}})
                if(user != null){
                    throw new Error('Este nombre de usuario ya se encuentra en uso')
                }else{
                    return true
                }
            } catch (error) {
                throw error
            }
        }),
    body('password')
        .notEmpty().withMessage('Debes ingresar una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres')
        // Requiere que la contraseña contenga mayúsculas.
        .matches(/^(?=.*?[A-Z]).+$/, "i").withMessage('Tu contraseña debe contener al menos una mayúscula')
        // Requiere que la contraseña contenga minúsculas.
        .matches(/^(?=.*?[a-z]).+$/, "i").withMessage('Tu contraseña debe contener al menos una letra minúscula')
        // Requiere que la contraseña contenga números.
        .matches(/^(?=.*?[0-9]).+$/, "i").withMessage('Tu contraseña debe contener al menos un número')
        // Requiere que la contraseña contenga caracteres especiales.
        .matches(/^(?=.*?[!@#$%ˆ&*,._^-]).+$/, "i").withMessage('Tu contraseña debe contener al menos un caracter especial'),
    body('passwordConfirm')
        .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
        .custom((value, {req}) => {
            /* Confirma si las contraseñas son iguales*/
            if (value !== req.body.password) {
                return false;
            }
            return true;
        }).withMessage('Las contraseñas deben ser iguales'),
    body('avatar')
        .custom((value, {req}) =>{
            if(req.file == undefined){
                return true
            } else if(req.file.originalname != /(?:.jpg|.jpeg|.png)$/){
                throw new Error('El archivo debe ser del tipo JPG, JPEG o PNG')
            }
        })
]