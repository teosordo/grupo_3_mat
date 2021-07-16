const productsFunctions = require('../models/product');
const userFunctions = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs')

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        let userToLogin = userFunctions.findByField('username', req.body.user);
        // Si el usuario exite devulve usuario, si no devuelve mensaje de error
        if(userToLogin){
            //comparo contraseña hasheada
            let okPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
            if(okPassword){
                return res.redirect('/')
            }
            return res.render('users/login', {
                errors:{
                    email: {
                        msg: 'El dato ingresado es incorrecto'
                    }
                }
            });
        }
        return res.render('users/login', {
            errors:{
                username: {
                    msg: 'No existe este usuario.'
                }
            }
        });
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
            return create ? res.redirect('/') : null
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
console.log(userFunctions.findByField('username', 'angie'));
module.exports = userController;