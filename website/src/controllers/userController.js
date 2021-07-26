const productsFunctions = require('../models/product');
const userFunctions = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        // Validación
        let userToLogin = userFunctions.findByField('email', req.body.email);
        // Si el usuario exite devulve usuario, si no devuelve mensaje de error
        if(userToLogin){
            //Comparo contraseña hasheada
            let okPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(okPassword){
                //por seguridad borro la visibilización del password en session
                delete userToLogin.password;
                delete req.body.password;
                req.session.user = userToLogin;
                //Permisos de administrador
                req.session.user.admin = req.body.email.indexOf('@matech.com') !== -1 ? true : false;
                // Cookie - Recuerda al usuario
                if(req.body.remember != undefined){
                    res.cookie('email', req.body.email,{maxAge: 1000 })
                }
                return res.redirect('/')
            }
            return res.render('users/login', {
                errors:{
                    email: {
                        msg: 'Los datos ingresados son incorrectos.'
                    }
                }
            });
        }
        return res.render('users/login', {
            errors:{
                email: {
                    msg: 'No existe este email.'
                }
            }
        });
    },
    logout: (req, res) => {
        res.clearCookie('email');
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
    },
    userProfile: (req,res) => {
        res.render('users/userProfile', {user: req.session.user});
    }
};
module.exports = userController;