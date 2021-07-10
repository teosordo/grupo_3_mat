const productsFunctions = require('../models/product');
const userFunctions = require('../models/user')

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
        res.send(userFunctions.all());
    },
    productCart: (req, res) => {
        total = productsFunctions.all().reduce((total, product) => {
            return total + product.priceA;
        }, 0);

        res.render('users/productCart', {product: productsFunctions.all()});
    }
};

module.exports = userController;