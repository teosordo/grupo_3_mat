const productsFunctions = require('../models/product');
const brandFunctions = require('../models/brand')
const categoryFunctions = require('../models/category')
const colorFunctions = require('../models/color')

// pasar a middleware
const finalPrice = (price, discount) => {
    let restante = (price * discount) / 100;
    return price - restante;
}

const productController = {
    listProduct: (req, res)=>{
        res.render('products/productList', {products: productsFunctions.all(), category: categoryFunctions.all(), finalPrice: finalPrice})
    },
    productDetail: (req, res) => {
        let idProduct = req.params.id
        let product = productsFunctions.search(idProduct);
        return product ? res.render('products/productDetail', {product: product}): res.redirect('/')

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
        return product == false ? res.redirect('/') : res.render('products/productEdit',{product: product, brands: brandFunctions.all(),categories: categoryFunctions.all(), colors: colorFunctions.all()})
    },
    update: (req, res) => {
        let result = productsFunctions.edit(req.body, req.file, req.params.id);
        return result == true ? res.redirect("/") : res.send("Ocurrió un error. No se pudo editar el producto");
    },
    deleteAll: (req,res) => {
        let result = productsFunctions.deleteAll(req.params.id);
        return result == true ? res.redirect("/") : res.send("Ocurrió un error. No se borró el producto") 
    }
};

module.exports = productController;