const {body} = require('express-validator')
module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre de la categoría'),
    body('detail')
        .notEmpty().withMessage('Ingrese la ayuda informativa de la categoría')
]