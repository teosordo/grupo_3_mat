const {body} = require('express-validator');

module.exports = [
    body('user')
        .notEmpty().withMessage('Ingrese su nombre de usuario'),
    body('password')
        .notEmpty().withMessage('Ingrese su contraseña').bail()
        .custom()
]