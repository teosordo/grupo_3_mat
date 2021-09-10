const {body} = require('express-validator');
const db = require('../../database/models');
module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre de la marca')
        .custom(async value =>{
            try {
                let brandName = await db.Brand.findOne({where:{name: value}})
                if(brandName) {
                    throw new Error('Nombre en uso')
                }else{
                    return true
                }
            } catch (error) {
                throw error
            }
        }),
]