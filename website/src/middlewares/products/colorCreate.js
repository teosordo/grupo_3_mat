const {body} = require('express-validator');
const db = require('../../database/models');
module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre del color')
        .custom(async value =>{
            try {
                let colorName = await db.Color.findOne({where:{name: value}})
                if(colorName) {
                    throw new Error('Nombre en uso')
                }else{
                    return true
                }
            } catch (error) {
                throw error
            }
        }),
]