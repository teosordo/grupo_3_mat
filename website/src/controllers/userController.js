const productsFunctions = require('../models/product');

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    productCart: (req, res) => {
        total = productsFunctions.all().reduce((total, product) => {
            return total + product.priceA;
        }, 0);

        res.render('users/productCart', {product: productsFunctions.all()});
    }
};

module.exports = userController;