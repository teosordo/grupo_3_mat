const {body} = require('express-validator')

module.exports = [
    body('name')
        .notEmpty().withMessage('Ingrese el nombre del producto').bail()
        .isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    body('category')
        .notEmpty().withMessage('Ingrese una categoría para el producto').bail(),
    body('brand')
        .notEmpty().withMessage('Ingrese una marca para el producto').bail(),
    body('price')
        .notEmpty().withMessage('Ingrese el valor del producto').bail()
        .isNumeric().withMessage('El valor del producto debe ser un número'),
    body('warranty')
        .notEmpty().withMessage('Ingrese la duración de la garantía').bail(),
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
    /* body('image') // ------------------------------------------------------- Mati
        .custom((value, {req}) => {
            if(req.file == null){
                throw new Error('Debe subir al menos una imagen')
            }else{
                return true
            }
        }).bail()
        .custom((value, {req}) =>{
            let authExt = ['jpg','png','jpeg'];
            let ext = req.file.filename.split('.').pop();
            if(authExt.includes(ext)){
                return true 
            }else{
                let extStr = authExt.toString()
                throw new Error(`Las extensiones permitidas son ${extStr}`)
            }
        }), */
    body('color')
        .notEmpty().withMessage('Debe elegir al menos 1 color').bail(),
    body('characteristics')
        .notEmpty().withMessage('Debe ingresar las caracteristicas').bail()
        .isLength({min: 20}).withMessage('Las caracteísticas del producto deben superar los 20 caracteres'),
    body('specs')
        .notEmpty().withMessage('Debe ingresar las especificaciones').bail()
        .isLength({min: 20}).withMessage('Las especificacionses del producto deben superar los 20 caracteres'),
    body('image') // --------------------------------------------------------- Teo
        .custom((value, {req}) =>{
            if(req.file == undefined){
                throw new Error('Debes subir al menos una imagen')
            } else {
                let authExt = ['jpg','png','jpeg'];
                let ext = req.file.filename.split('.').pop();
                if(authExt.includes(ext)){
                    return true
                }else{
                    let extStr = authExt.toString()
                    throw new Error(`Las extensiones permitidas son ${extStr}`)
                }
            }

            /*
                if(req.files == undefined){
                    throw new Error('Debes subir al menos una imagen')
                } else {
                    let authExt = ['jpg','png','jpeg'];
                    req.files.forEach(file => {
                        let ext = file.filename.split('.').pop();
                        console.log(file.filename);
                        if(authExt.includes(ext)){
                            console.log(authExt.includes(ext));
                            return true
                        }else{
                            let extStr = authExt.toString()
                            throw new Error(`Las extensiones permitidas son ${extStr}`)
                        } 
                    });
                }
            */
        })
]