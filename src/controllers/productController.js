const productsFunctions = require('../models/product')
const products = productsFunctions.all()
const productController = {
    productDetail: (req, res) => {
        let idProduct = req.params.id;
        let product = productsFunctions.search(idProduct)
        res.render('productDetail', {product: product[0]});
    },
    productNewProduct:(req,res) => {
        if(req.params.id == undefined){
            res.redirect('/')
        }else{
            res.render('newProductCreate')
        }
    },
    productCreate:(req,res)=>{
        let result = productsFunctions.create(req.body, req.file)
        return result == true ? res.redirect('/') : res.send("ERROR")
    },
    productEdit:(req,res) => {
        let idProduct = req.params.id
        let product = productsFunctions.search(idProduct)
        res.render('newProductEdit', {product: product[0]})
    }
};

module.exports = productController;