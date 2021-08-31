const {body} = require('express-validator');
const db = require('../../database/models')
const bcrypt = require('bcryptjs');

module.exports = [
    body('email')
        .notEmpty().withMessage('Ingrese su e-mail').bail()
        .isEmail().withMessage('Ingrese un e-mail válido').bail()
        .custom(async value=>{
            let userToLogin = await db.User.findOne({where:{email: value}});
            // Si el usuario exite devulve usuario, si no devuelve mensaje de error
            if(userToLogin){
                return true;
            } else {
                throw new Error('Ingrese datos validos.')
            }
        }),
    body('password')
        .notEmpty().withMessage('Ingrese su contraseña').bail()
        .custom(async (value, {req})=>{
            let userToLogin = await db.User.findOne({where:{email: req.body.email}});
            if(userToLogin == null){
                return false
            }
            let okPassword = bcrypt.compareSync(value, userToLogin.password);
            //Comparo contraseña hasheada
                if(okPassword){
                    //por seguridad borro la visibilización del password en session
                    delete userToLogin.password;
                    delete value;
                    req.session.user = userToLogin;
                    return true;
                } else {
                    throw new Error('Los datos ingresados son incorrectos.')
                }
        })
]