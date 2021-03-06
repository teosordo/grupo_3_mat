const {body} = require('express-validator');
const db = require('../../database/models/');

module.exports = [
    body('firstName')
        .notEmpty().withMessage('Debes ingresar tu nombre').bail()
        .isLength({min:2, max:20}).withMessage('Debes ingresar entre 2 a 20 letras'),
    body('lastName')
        .notEmpty().withMessage('Debes ingresar tu apellido').bail()
        .isLength({min:2, max:20}).withMessage('Debes ingresar entre 2 a 20 letras'),
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
        .isLength({min: 5, max: 10}).withMessage('Tu usuario debe tener entre 5 y 10 caracteres.').bail()
        //.matches(/^(?=.*?[_-]).+$/, "i").withMessage('Debes ingresar carácteres especiales como: "-" y/o "_".').bail()
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
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
        // Requiere que la contraseña contenga mayúsculas.
        .matches(/^(?=.*?[A-Z]).+$/, "i").withMessage('Tu contraseña debe contener al menos una mayúscula')
        // Requiere que la contraseña contenga minúsculas.
        .matches(/^(?=.*?[a-z]).+$/, "i").withMessage('Tu contraseña debe contener al menos una letra minúscula')
        // Requiere que la contraseña contenga números.
        .matches(/^(?=.*?[0-9]).+$/, "i").withMessage('Tu contraseña debe contener al menos un número')
        // Requiere que la contraseña contenga caracteres especiales.
        .matches(/^(?=.*?[!,._-]).+$/, "i").withMessage('Tu contraseña debe contener al menos un caracter especial'),
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
            }else{
                let authExt = ['jpg','png','jpeg'];
                let ext = req.file.filename.split('.').pop();
                if(authExt.includes(ext)){
                    return true
                }else{
                    let extStr = authExt.toString()
                    throw new Error(`Las extensiones permitidas son ${extStr}`)
                }
            } 
        })
]