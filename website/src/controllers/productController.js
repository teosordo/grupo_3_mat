const productsFunctions = require('../models/product');
const brandFunctions = require('../models/brand')
const categoryFunctions = require('../models/category')
const colorFunctions = require('../models/color')

const productController = {
    listProduct: (req, res)=>{
        res.render('products/productList', {products : productsFunctions.allComplete()});
    },
    productDetail: (req, res) => {
        let idProduct = req.params.id
        let product = productsFunctions.search(idProduct);
        return product == false ?  res.redirect('/'):res.render('products/productDetail', {product: product})

    },
    newProduct:(req,res) => {
        res.render('products/productCreate', {brands: brandFunctions.all(),categories: categoryFunctions.all(), colors:colorFunctions.all()})
    },
    createError:(req,res)=>{
        let result = productsFunctions.create(req.body, req.file);
        return result == true ? res.redirect('/') : res.send("ERROR");
    },
    productEdit:(req,res) => {
        let idProduct = req.params.id;
        let product = productsFunctions.search(idProduct);
        return product == false ? res.redirect('/') : res.render('products/productEdit',{product: product})
    },
    deleteAll: (req,res) => {
        let result = productsFunctions.deleteAll(req.params.id);
        return result == true ? res.redirect("/") : res.send("Ocurrió un error. No se borró el producto") 
    }
};

module.exports = productController;