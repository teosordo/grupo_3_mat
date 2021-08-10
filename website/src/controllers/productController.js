const productsFunctions = require('../models/product');
const brandFunctions = require('../models/brand')
const categoryFunctions = require('../models/category')
const colorFunctions = require('../models/color')
const {validationResult} = require('express-validator')
const db = require('../database/models')
// pasar a middleware
const finalPrice = (price, discount) => {
    let restante = (price * discount) / 100;
    return price - restante;
}

const productController = {
    listProduct: async (req, res)=>{
        try {
            /*Productos completos*/
            let products = await db.Product.findAll({
                include:['brand','category','images']
            });
            /*Categorias para el navbar*/
            let category = await db.Category.findAll();
            /*Calcula el descuento que tiene el producto*/
            let finalPrice = (price, discount) => {
                let restante = (price * discount) / 100;
                return price - restante;
            };
            return res.render('products/productList', {products, category, finalPrice});
        }catch (error) {
            throw error;
        }
    },
    productDetail: async (req, res) => {
        try {
            let idProduct = req.params.id
            let product = await db.Product.findByPk(idProduct,{
                include:['colors','brand','category','images']
            });
            return product ? res.render('products/productDetail', {product}): res.redirect('/')
        } catch (error) {
            throw error
        }
    },
    newProduct: async (req,res) => {
        return res.render('products/productCreate', {brands: await db.Brand.findAll(),categories: await db.Category.findAll(), colors: await db.Color.findAll()})
    },
    createProduct: async  (req,res)=>{
        const result = validationResult(req);
        if(result.errors.length > 0){
            return res.render('products/productCreate', {brands: await db.Brand.findAll(),categories: await db.Category.findAll(), colors: await db.Color.findAll(),errors: result.mapped(), productInfo: req.body})
        }else{
            try {
                //Crea el producto en la base de datos
                let newProduct = await db.Product.create({
                    name: req.body.name,
                    brand_id: req.body.brand,
                    category_id: req.body.category,
                    price: req.body.price,
                    stock: req.body.stock,
                    discount: req.body.discount,
                    warranty: req.body.warranty,
                    video: req.body.video,
                    characteristics: req.body.characteristics,
                    specs: req.body.specs
                })
                //Crea la imagen del producto en la base de datos
                let newImage = await db.Image.create({
                    name: req.file.filename,
                    product_id: newProduct.id
                })
                //Agrega los colores del producto a la tabla intermedia 
                let newProductColor = req.body.color
                if(Array.isArray(newProductColor)){
                    for (let i = 0; i < newProductColor.length; i++) {
                        await db.ProductsColor.create({
                            product_id: newProduct.id,
                            color_id: newProductColor[i]
                        })
                    }
                }else{
                    await db.ProductsColor.create({
                        product_id: newProduct.id,
                        color_id: newProductColor
                    })
                }
                res.redirect('/')
            }catch (error) {
                throw error
                }
        }
        
        /* const result = validationResult(req);
        if(result.errors.length > 0){
            return res.render('products/productCreate',{brands: brandFunctions.all(),categories: categoryFunctions.all(), colors:colorFunctions.all(),errors: result.mapped(), productInfo: req.body})
        }else{
            let product = productsFunctions.create(req.body, req.file); 
            return product == true ? res.redirect('/') : res.send("ERROR");
        } */
    },
    productEdit:(req,res) => {
        let idProduct = req.params.id;
        let product = productsFunctions.search(idProduct);
        return product == false ? res.redirect('/') : res.render('products/productEdit',{product: product, brands: brandFunctions.all(),categories: categoryFunctions.all(), colors: colorFunctions.all()})
    },
    update: (req, res) => {
        const result = validationResult(req);
        let origProduct = productsFunctions.search(req.params.id);
        let editedProduct = req.body
        editedProduct.id = req.params.id
        editedProduct.image = origProduct.image
        if(result.errors.length > 0){
            return res.render('products/productEdit',{brands: brandFunctions.all(),categories: categoryFunctions.all(), colors:colorFunctions.all(),errors: result.mapped(), product: editedProduct})
        }else{
            let product = productsFunctions.edit(req.body, req.file, req.params.id);
            return product == true ? res.redirect("/") : res.send("Ocurrió un error. No se pudo editar el producto");
        }
    },
    deleteAll: (req,res) => {
        let result = productsFunctions.deleteAll(req.params.id);
        return result == true ? res.redirect("/") : res.send("Ocurrió un error. No se borró el producto") 
    },
    categories: (req, res) => {
        res.render('products/productCategories', {categories: categoryFunctions.all()});
    },
    adminOptions: async (req, res) => {
        try {
            /*Productos completos*/
            let products = await db.Product.findAll({
                include:['brand','category','images']
            });
            /*Categorias para formulario*/
            let categories = await db.Category.findAll();
            /*Marcas para formulario*/
            let brands = await db.Brand.findAll();
            /*Colores para formulario*/
            let colors = await db.Color.findAll();
            
            return res.render('products/productAdminOptions', {products, categories, brands, colors});
        }catch (error) {
            throw error;
        }
    },
    createBrand: async (req, res) => {
        
    },
    createCategory: async (req, res) => {
        
    },
    createColor: async (req, res) => {
        
    }
};

module.exports = productController;