const {body} = require('express-validator');

module.exports = [/*
    body('usernme')
        .notEmpty().withMessage('Ingrese su nombre de usuario').bail()
        .custom( value =>{
            let userToLogin = userFunctions.findByField('username', value);
            // Si el usuario exite devulve usuario, si no devuelve mensaje de error
            if(userToLogin){
                return res.redirect('/');
            }
            return res.render('users/login', {
                errors:{
                    user: {
                        msg: 'No existe este usuario.'
                    }
                }
            })
        }),
    body('password')
        .custom(value =>{
                //Comparo contraseña hasheada
                let okPassword = bcrypt.compareSync(value, userToLogin.password);
                if(okPassword){
                    return res.redirect('/')
                }
                return res.render('users/login', {
                    errors:{
                        password: {
                            msg: 'Los datos ingresados son incorrectos.'
                        }
                    }
                });
        })
        */
]