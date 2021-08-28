const {body} = require('express-validator');
const db = require('../../database/models/');

module.exports = [
    body('firstName').notEmpty().withMessage('Ingrese un nuevo nombre'),
    body('lastName').notEmpty().withMessage('Ingrese un nuevo apellido'),
    body('email')
        .trim()
        .notEmpty().withMessage('Ingrese su nuevo e-mail').bail()
        .isEmail().withMessage('Ingrese un e-mail válido').bail()
        .custom(async (value, {req}) =>{
            try {
                let user = await db.User.findByPk(req.params.id)
                let userEmail = await db.User.findOne({where:{email: value}})
                // Si hay un usuario con ese mail
                // Y si el que figura excistente no pertenece al user que se está editando
                // Devuelve error
                if(userEmail && userEmail.id != user.id){
                    throw new Error('Ese e-mail no se encuentra disponible')
                }else{
                    return true
                }  
            } catch (error) {
                throw error
            }
        }), 
    body('username')
        .trim()
        .notEmpty().withMessage('Ingrese un nuevo nombre de usuario').bail()
        .isLength({min: 5}).withMessage('El nombre de usuario debe tener al menos 5 caracteres').bail()
        .custom(async (value, {req}) =>{
            /* Revisa si hay un usuario con el username*/
            try {
                let user = await db.User.findByPk(req.params.id)
                let userName = await db.User.findOne({where:{username: value}})
                // Si hay un usuario con ese nombre de usuario
                // Y si el que figura excistente no pertenece al user que se está editando
                // Devuelve error
                if(userName != null && userName.id != user.id){
                    throw new Error('Ese nombre de usuario no se encuentra disponible')
                }else{
                    return true
                }
            } catch (error) {
                throw error
            }
        }),
    body('password')
        //.trim()
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
        // No es necesario hacer esto pero permite personalizar el mensaje de error para dejar en claro al user que elemento le falta
        .not()
        .isLowercase().withMessage('Tu contraseña debe contener al menos una minúscula')
        .not()
        .isUppercase().withMessage('Tu contraseña debe contener al menos una mayúscula').bail()
        // Requiere que la contraseña contenga mayúsculas, minúsculas y numeros.
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$.!%*#?&]{8,}$/, "i").withMessage('Tu contraseña debe contener al menos un número').bail()
        // Solo si la contraseña tiene valores entre 1 y 8 aparece un arror de caracteres minimos
        // Si se deja vacio se conserva la contraseña del usuario
        .custom((value, {req}) =>{
            if(value.length>0 && value.length <8){
                throw new Error('La contraseña debe tener al menos 8 caracteres!!')
            } else {
                return true
            }
        }),
    body('passwordConfirm')
        .trim()
        .custom((value, {req}) => {
            // Confirma si las contraseñas son iguales
            if (value !== req.body.password) {
                return false;
            }
            return true;
        }).withMessage('Las contraseñas deben ser iguales'),
]