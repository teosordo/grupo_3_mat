const productsFunctions = require('../models/product');
const userFunctions = require('../models/user');
const {validationResult} = require('express-validator');

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        res.send(req.body);
    },
    register: (req, res) => {
        res.render('users/register');
    },
    createUser: (req, res) => {
        const result = validationResult(req);
        if(result.errors.length > 0){
            return res.render('users/register',{errors: result.mapped()})
        }else{
            let create = userFunctions.create(req.body,req.file)
            return create ? res.redirect('/') : null
        }
    },
    productCart: (req, res) => {
        total = productsFunctions.all().reduce((total, product) => {
            return total + product.priceA;
        }, 0);

        res.render('users/productCart', {product: productsFunctions.all()});
    },
    userTest: (req,res) => {
        let userId  = req.params.id
        let result = userFunctions.search(userId)
        return result ? res.render('users/test', {user: result}) : res.send("error")
    }
};

module.exports = userController;