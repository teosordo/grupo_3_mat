const {body} = require('express-validator');
const db = require('../../database/models');
module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre del color'),
]