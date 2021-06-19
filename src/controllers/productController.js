const productsFunctions = require('../models/product')
const products = productsFunctions.all()
const productController = {
    productDetail: (req, res) => {
        let idProduct = req.params.id;
        let product = productsFunctions.search(idProduct)
        res.render('productDetail', {product: product[0]});
    },
    productNewProduct:(req,res) => {
        res.render('productCreate')
    },
    productEdit:(req,res) => {
        let idProduct = req.params.id
        let product = productsFunctions.search(idProduct)
        res.render('productEdit', {product: product[0]})
    },
};

module.exports = productController;