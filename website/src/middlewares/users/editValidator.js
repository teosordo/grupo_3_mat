const {body} = require('express-validator');
const db = require('../../database/models/');
const bcrypt = require('bcryptjs');

module.exports = [
    body('firstName')
        .notEmpty().withMessage('Ingrese un nuevo nombre').bail()
        .isLength({min: 2}).withMessage('El nombre de usuario debe tener al menos 5 caracteres'),
    body('lastName')
        .notEmpty().withMessage('Ingrese un nuevo apellido').bail()
        .isLength({min: 2}).withMessage('El nombre de usuario debe tener al menos 5 caracteres'),
    body('username')
        .notEmpty().withMessage('Ingrese un nuevo nombre de usuario').bail()
        .isLength({min: 5}).withMessage('El nombre de usuario debe tener al menos 5 caracteres').bail()
        .custom(async (value, {req}) =>{
            //Revisa si hay un usuario con el username
            try {
                let user = await db.User.findByPk(req.params.id)
                let userName = await db.User.findOne({where:{username: value}})
                // Si hay un usuario con ese nombre de usuario
                // Y si el que figura excistente no pertenece al user que se está editando
                // Devuelve error
                if(userName != null && userName.id != user.id){
                    throw new Error('Ese nombre de usuario no se encuentra disponible')
                }else{
                    return true
                }
            } catch (error) {
                throw error
            }
        }),
    body('email')
        .notEmpty().withMessage('Ingrese su nuevo e-mail').bail()
        .isEmail().withMessage('Ingrese un e-mail válido').bail()
        .custom(async (value, {req}) =>{
            try {
                let user = await db.User.findByPk(req.params.id)
                let userEmail = await db.User.findOne({where:{email: value}})
                // Si hay un usuario con ese mail
                // Y si el que figura excistente no pertenece al user que se está editando
                // Devuelve error
                if(userEmail && userEmail.id != user.id){
                    throw new Error('Ese e-mail no se encuentra disponible')
                }else{
                    return true
                }  
            } catch (error) {
                throw error
            }
        }), 
    body('password')    
        //Solo puede editar el perfil con la contraseña correcta
        .custom(async (value, {req})=>{
            let userToLogin = await db.User.findByPk(req.params.id);
            if(userToLogin == null){
                return false
            }
            let okPassword = bcrypt.compareSync(value, userToLogin.password);
            //Comparo contraseña hasheada
                if(okPassword){
                    //por seguridad borro la visibilización del password en session
                    delete userToLogin.password;
                    delete value;
                    return true;
                } else {
                    throw new Error('Para editar tus datos necesitas tu contraseña actual.')
                }
        })
        ,
    body('passwordConfirm')
        .custom((value, {req}) => {
            // Confirma si las contraseñas son iguales
            if (value !== req.body.password) {
                return false;
            }
            return true;
        }).withMessage('Las contraseñas deben ser iguales'),
    body('avatar')
        .custom((value, {req}) =>{
            if(req.file == undefined){
                return true
            } else if(req.file.originalname != /(?:.jpg|.jpeg|.png)$/){
                throw new Error('El archivo debe ser del tipo JPG, JPEG o PNG')
            }
        })
]