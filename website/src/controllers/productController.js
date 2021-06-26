const { response } = require('express');
const productsFunctions = require('../models/product');
const brandFunctions = require('../models/brand')
const categoryFunctions = require('../models/category')
const colorFunctions = require('../models/color')

const productController = {
    listProduct: (req, res)=>{
        res.render('list', {products : productsFunctions.all()});
    },
    productDetail: (req, res) => {
        let idProduct = req.params.id
        let product = productsFunctions.search(idProduct);
        return product == false ?  res.redirect('/'):res.render('productDetail',{product: product[0]})

    },
    productNewProduct:(req,res) => {
        res.render('newProductCreate', {brands: brandFunctions.all(),categories: categoryFunctions.all(), colors:colorFunctions.all()})
    },
    productCreate:(req,res)=>{
        let result = productsFunctions.create(req.body, req.file);
        return result == true ? res.redirect('/') : res.send("ERROR");
    },
    productEdit:(req,res) => {
        let idProduct = req.params.id;
        let product = productsFunctions.search(idProduct);
         return product == false ? res.redirect('/') : res.render('newProductEdit',{product: product[0]})
    }
};

module.exports = productController;