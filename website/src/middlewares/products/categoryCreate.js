const {body} = require('express-validator');
const db = require('../../database/models/');
module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre de la categoría')
        // se fija si la categoría ya existe
        .custom(async value =>{
            try {
                let categoryName = db.Category.findOne({where:{name: value}})
                if(categoryName) {
                    throw new Error('Nombre en uso')
                }
            } catch (error) {
                throw error
            }
        }),
    body('detail')
        .notEmpty().withMessage('Ingrese la ayuda informativa de la categoría')
]