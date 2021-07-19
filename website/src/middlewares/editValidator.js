const {body} = require('express-validator')
module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre del producto'),
    body('colors')
        .notEmpty().withMessage('Debe elegir al menos 1 color'),
    body('price')
        .notEmpty().withMessage('Ingrese el Precio del producto').bail()
        .isNumeric().withMessage('Solo se permiten números para precios'),
    body('discount')
        .notEmpty().withMessage('Complete el campo').bail()
        .isNumeric().withMessage('Solo se permiten números para descuentos'),
    body('stock')
        .notEmpty().withMessage('Complete el campo')
        .isNumeric().withMessage('Solo se permiten números para stock'),
    body('warranty')
        .notEmpty().withMessage('Ingrese la garantia del producto'),
    body('videos')
        .custom(value =>{
            if(value === ''){
                return true
            }else if(value.indexOf('youtube.com/embed/' ) >= 0){
                return true 
                
            }else{
               throw new Error('El link debe empezar con youtube.com/embed/')
            }
        }),
    body('detail')
        .notEmpty().withMessage('Complete el campo con el detalle del producto'),
    body('caract')
        .notEmpty().withMessage('Complete el campo con las características del producto'),
    body('specs')
        .notEmpty().withMessage('Complete el campo con las especificaciones del producto') 
]