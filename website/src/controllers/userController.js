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
        const results = validationResult(req);
        if(results.errors.length > 0){
            return res.render('users/login',{errors: results.mapped(), userInfo: req.body})
        }

        // Cookie - Recuerda al usuario
        if(req.body.remember != undefined){
            res.cookie('email', req.session.user.email,{maxAge: 9999999 })
        }

        return res.redirect('/')
        
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