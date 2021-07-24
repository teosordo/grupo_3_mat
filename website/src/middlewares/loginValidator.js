const {body} = require('express-validator');

module.exports = [
    body('email')
        .notEmpty().withMessage('Ingrese su e-mail').bail()
        .isEmail().withMessage('Ingrese un e-mail válido'),
    body('password')
        .notEmpty().withMessage('Ingrese su contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña  debe tener al menos 8 caracteres'),
]