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
            let idPage = parseInt(req.params.id);
            if(idPage == 0){
                res.redirect('/products/1')
            }
            //Numero para limit/offset/math.ceil
            let settingNumber = 3
            /*Productos completos*/
            let products = await db.Product.findAll({
                include:['brand','category','images'],
                offset: (idPage-1) * settingNumber,
                limit: settingNumber,
            });
            /*Categorias para el navbar*/
            let category = await db.Category.findAll();

            /*Calcula el descuento que tiene el producto*/
            let finalPrice = (price, discount) => {
                let restante = (price * discount) / 100;
                return price - restante;
            };

            //Busca y cuenta el total de productos
            let productsTotalCount = await db.Product.count();
            //Redondea el numero para saber el total de paginas necesarias 
            let totalNumPages = Math.ceil(productsTotalCount / settingNumber);

            return res.render('products/productList', {products, category, finalPrice, idPage, pages: totalNumPages});
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
        return res.render('products/productCreate', {brands: await db.Brand.findAll(),categories: await db.Category.findAll(), colors: await db.Color.findAll()});
    },
    createProduct: async  (req,res)=>{
        const result = validationResult(req);
        if(result.errors.length > 0){
            return res.render('products/productCreate', {brands: await db.Brand.findAll(),categories: await db.Category.findAll(), colors: await db.Color.findAll(),errors: result.mapped(), productInfo: req.body});
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
    newBrand: (req, res) => {
        res.render('products/productBrand')
    },
    createBrand: async (req, res) => {
        let newBrand = await db.Brand.create(req.body)
        return res.redirect('/')
    },
    newCategory: (req, res) => {
        res.render('products/productCategory')
    },
    createCategory: async (req, res) => {
        let newCategory = await db.Category.create(req.body)
        return res.redirect('/')
    },
    newColor:  (req, res) => {
        res.render('products/productColor')
    },
    createColor: async (req, res) => {
        let newColor = await db.Color.create(req.body)
        return res.redirect('/')
    }
};

module.exports = productController;