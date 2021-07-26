const {body} = require('express-validator');
const {findByField} = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = [
    body('email')
        .notEmpty().withMessage('Ingrese su e-mail').bail()
        .isEmail().withMessage('Ingrese un e-mail válido').bail()
        .custom(value=>{
            let userToLogin = findByField('email', value);
            // Si el usuario exite devulve usuario, si no devuelve mensaje de error
            if(userToLogin){
                return true;
            } else {
                throw new Error('No existe este email.')
            }
        }),
    body('password')
        .notEmpty().withMessage('Ingrese su contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña  debe tener al menos 8 caracteres').bail()
        .custom((value, {req})=>{
            let userToLogin = findByField('email', req.body.email);
            let okPassword = bcrypt.compareSync(value, userToLogin.password);
            //Comparo contraseña hasheada
                if(okPassword){
                    //por seguridad borro la visibilización del password en session
                    delete userToLogin.password;
                    delete value;
                    req.session.user = userToLogin;
                    //Permisos de administrador
                    req.session.user.admin = req.body.email.indexOf('@matech.com') !== -1 ? true : false;

                    return true;
                } else {
                    throw new Error('Los datos ingresados son incorrectos.')
                }
        })
]