const {body} = require('express-validator')

module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre del producto'),
    body('category')
        .notEmpty().withMessage('Ingrese una categoría para el producto'),
    body('brand')
        .notEmpty().withMessage('Ingrese una marca para el producto'),
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
               return false
            }
        }).withMessage('El link debe empezar con youtube.com/embed/'),
    body('image')
        .custom((value, {req}) => {
            if(req.file == null){
                throw new Error('Debe subir al menos una imagen')
            }else{
                return true
            }
        }),
    body('color')
        .notEmpty().withMessage('Debe elegir al menos 1 color'),
    body('characteristics')
        .notEmpty().withMessage('Debe ingresar las caracteristicas'),
    body('specs')
        .notEmpty().withMessage('Debe ingresar las especificaciones')
]