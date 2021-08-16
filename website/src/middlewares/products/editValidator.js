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
        .notEmpty().withMessage('Ingrese el descuento del producto, si no tiene ingrese 0').bail()
        .isNumeric().withMessage('Solo se permiten números para descuentos'),
    body('stock')
        .notEmpty().withMessage('Complete el stock del producto').bail()
        .isNumeric().withMessage('Solo se permiten números para stock'),
    body('warranty')
        .notEmpty().withMessage('Ingrese la garantia del producto'),
    body('video')
        .custom(value =>{
            if(value == '' || value.indexOf('youtube.com/embed/') >= 0){
                return true
            }else{
               throw new Error('El link debe empezar con youtube.com/embed/')
            }
        }),
    body('characteristics')
        .notEmpty().withMessage('Complete el campo con las características del producto'),
    body('specs')
        .notEmpty().withMessage('Complete el campo con las especificaciones del producto') 
]