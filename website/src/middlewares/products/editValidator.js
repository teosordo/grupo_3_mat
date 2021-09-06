const {body} = require('express-validator')
module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre del producto').bail()
        .isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracters'),
    body('colors')
        .notEmpty().withMessage('Debe elegir al menos 1 color'),
    body('price')
        .notEmpty().withMessage('Ingrese el precio del producto').bail()
        .isNumeric().withMessage('Solo se permiten números para precios'),
    body('discount')
        .custom(value =>{
            if(value != '' && isNaN(value)){
                throw new Error('El valor debe ser un número')
            }else{
                return true
            }
        }),
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
        .notEmpty().withMessage('Complete el campo con las características del producto').bail()
        .isLength({min: 20}).withMessage('Las caracteristicas deben contener al menos 20 caracteres'),
    body('specs')
        .notEmpty().withMessage('Complete el campo con las especificaciones del producto')
        .isLength({min: 20}).withMessage('Las especificaciones deben contener al menos 20 caracteres'),
    body('image')
        .custom((value, {req}) =>{
            if(req.file == undefined){
                return true
            } else if(req.file.originalname != /(?:.jpg|.jpeg|.png)$/){
                throw new Error('El archivo debe ser del tipo JPG, JPEG o PNG')
            }
        })
]