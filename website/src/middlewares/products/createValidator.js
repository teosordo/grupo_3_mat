const {body} = require('express-validator')

module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre del producto'),
    body('price')
        .notEmpty().withMessage('Ingrese el valor del producto').bail()
        .isNumeric().withMessage('Ingrese el valor del producto'),
    body('warranty')
        .notEmpty().withMessage('Ingrese la duración de la garantía'),
    body('stock')
        .notEmpty().withMessage('Ingrese la cantidad de stock del producto').bail()
        .isNumeric().withMessage('Ingrese un número valido'),
    body('video')
        .custom(value =>{
            if(value === '' || value.indexOf('youtube.com/embed/' ) >= 0 ){
                return true
            }else{
               throw new Error('El link debe empezar con youtube.com/embed/')
            }
        }),
    body('color')
        .notEmpty().withMessage('Debe elegir al menos 1 color'),
    body('characteristics')
        .notEmpty().withMessage('Debe ingresar las caracteristicas'),
    body('specs')
        .notEmpty().withMessage('Debe ingresar las especificaciones')
]