const productsFunctions = require('../models/product');
const userFunctions = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        // Sesión de usuario - req.session.userLogged = req.body;

        // Validación
        let userToLogin = userFunctions.findByField('username', req.body.user);
        // Si el usuario exite devulve usuario, si no devuelve mensaje de error
        if(userToLogin){
            //Comparo contraseña hasheada
            let okPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(okPassword){
                //por seguridad borro la visibilización del password en session
                delete userToLogin.password;
                delete req.body.password;
                req.session.userLogged = userToLogin;
                
                if(req.body.remember != undefined){
                    // Cookie - Recuerda al usuario
                    res.cookie('user', req.body.userLogged,{expire: new Date() + 9999})
                    //console.log(req.body.userLogged)
                } else {
                    //console.log('chau')
                }

                //console.log(req.session.userLogged);
                //console.log(userToLogin.admin);
                //console.log(req.body.admin);
                
                return res.redirect('/')
            }
            return res.render('users/login', {
                errors:{
                    user: {
                        msg: 'Los datos ingresados son incorrectos.'
                    }
                }
            });
        }
        return res.render('users/login', {
            errors:{
                user: {
                    msg: 'No existe este usuario.'
                }
            }
        });
    },
    logout: (req, res) => {
        res.clearCookie('user');
        req.session.destroy();
        return res.redirect('/');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    createUser: (req, res) => {
        const result = validationResult(req);
        if(result.errors.length > 0){
            return res.render('users/register',{errors: result.mapped(), userInfo: req.body})
        }else{
            let create = userFunctions.create(req.body,req.file)
            return create ? res.redirect('/users/login') : null
        }
    },
    productCart: (req, res) => {
        total = productsFunctions.all().reduce((total, product) => {
            return total + product.price;
        }, 0);

        res.render('users/productCart', {product: productsFunctions.all()});
    },
    userlist: (req,res) => {
        let allUsers = userFunctions.all()
        res.render('users/list', {users: allUsers})
    }
};
module.exports = userController;