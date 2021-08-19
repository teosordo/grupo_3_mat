const productsFunctions = require('../models/product');
const brandFunctions = require('../models/brand')
const categoryFunctions = require('../models/category')
const colorFunctions = require('../models/color')
const {validationResult} = require('express-validator')
const db = require('../database/models');
const product = require('../models/product');
// pasar a middleware?
const finalPrice = (price, discount) => {
    let restante = (price * discount) / 100;
    console.log(price);
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
            let products;
            // Total de productos
            let productsTotalCount;
            if(req.query.searchbar){
                // Si se accede a la lista buscando con el searchbar
                // Devuelve todos los productos cuyo nombre coincida con lo buscado
                products = await db.Product.findAll({
                    where: {
                        name: {[db.Sequelize.Op.like]: `%${req.query.searchbar}%`}
                    },
                    include: ['brand','category','images'],
                    offset: (idPage-1) * settingNumber,
                    limit: settingNumber
                });
                
                productsTotalCount = products.length
            } else if(req.params.categoryId) {
                // Si accede a través del nav de categorías
                // Devuelve todos los productos de cierta categoría
                products = await db.Product.findAll({
                    where: {
                        category_id: req.params.categoryId
                    },
                    include: ['brand','category','images'],
                    offset: (idPage-1) * settingNumber,
                    limit: settingNumber
                });

                productsTotalCount = products.length
            } else {
                // Devuelve TODOS los productos
                products = await db.Product.findAll({
                    include:['brand','category','images'],
                    offset: (idPage-1) * settingNumber,
                    limit: settingNumber
                });
                
                //Busca y cuenta el total de productos
                productsTotalCount = await db.Product.count();
            }

            /*Categorias para el navbar*/
            let category = await db.Category.findAll();

            //Redondea el numero para saber el total de paginas necesarias 
            let totalNumPages = Math.ceil(productsTotalCount / settingNumber);
            // console.log(req.params.categoryId);
            return res.render('products/productList', {products, category, idPage, pages: totalNumPages});
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
                    originalPrice: req.body.price,
                    discount: 0,
                    price: req.body.price,
                    stock: req.body.stock,
                    warranty: req.body.warranty,
                    video: req.body.video,
                    characteristics: req.body.characteristics,
                    specs: req.body.specs
                });
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
    productEdit: async (req,res) => {
        try {
        // data para usar en el view
        let product = await db.Product.findByPk(req.params.id, {include: ['images', 'colors']});
        let brands = await db.Brand.findAll();
        let categories = await db.Category.findAll();
        let colors = await db.Color.findAll();

        return product == false ? res.redirect('/') : res.render('products/productEdit',{product, brands, categories, colors});
        } catch (error) {
            throw error;
        }
        
    },
    updateProduct: async (req, res) => {
        const result = validationResult(req);

        if(result.errors.length > 0){
            // data para usar en el view
            // Podes usar include del producto para las imágenes
            // Revisar el array por un find all
            let origProduct = await db.Product.findByPk(req.params.id);
            let image = await db.Image.findOne({where: {product_id: origProduct.id}});
            let brands = await db.Brand.findAll();
            let categories = await db.Category.findAll();
            let colors = await db.Color.findAll();
            let editedProduct = req.body;
            editedProduct.id = origProduct.id;
            editedProduct.images = Array.of(image);
            editedProduct.prevColors = editedProduct.colors;
            editedProduct.prevName = origProduct.name;

            return res.render('products/productEdit',{brands, categories, colors, errors: result.mapped(), product: editedProduct});
        }else{
            try {
                // Edita la tabla de products
                let editProduct = await db.Product.update({
                    name: req.body.name,
                    brand_id: req.body.brand,
                    category_id: req.body.category,
                    originalPrice: req.body.price,
                    discount: req.body.discount != null? req.body.discount: 0,
                    price: finalPrice(parseInt(req.body.price), parseInt(req.body.discount)),
                    stock: req.body.stock,
                    warranty: req.body.warranty,
                    video: req.body.video,
                    characteristics: req.body.characteristics,
                    specs: req.body.specs
                }, {
                    where: {
                        id: req.params.id
                    }
                });

                // Edita la tabla de images
                if(req.file != undefined){
                    await db.Image.update({
                        name: req.file.filename
                    }, {
                        where: {
                            product_id: req.params.id
                        }
                    });
                }

                //req.file == undefined ? producto.image : req.file.filename

                // Edita la tabla intermedia que conecta con colors 
                let newColors = req.body.colors;
                let colorsToEdit = await db.ProductsColor.findAll({
                    where: {
                        product_id: req.params.id
                    }
                });

                // convierte en array los colores entrantes
                if(!Array.isArray(newColors)){
                    newColors = Array.of(newColors);
                }

                if(newColors.length > colorsToEdit.length){
                    // si la cantidad de colores entrantes es mayor los existentes crea una nueva relación y luego edita las restantes

                    let newRows = newColors.length - colorsToEdit.length;
                    for(let i = 0; i < newRows; i++){
                        await db.ProductsColor.create({
                            product_id: req.params.id,
                            color_id: colorsToEdit[0].dataValues.color_id
                        });
                    }

                    let rowsToEdit = await db.ProductsColor.findAll({
                        where: {
                            product_id: req.params.id
                        }
                    });

                    for(let i = 0; i < newColors.length; i++){
                        await db.ProductsColor.update({
                            color_id: newColors[i]
                        }, {
                            where: {
                                product_id: req.params.id,
                                id: rowsToEdit[i].dataValues.id
                            }
                        });
                    }
                } else if(newColors.length < colorsToEdit.length){
                    // si la cantidad de colores entrantes es menor borra una relación y edita las restantes

                    let rowsToDelete = colorsToEdit.length - newColors.length;
                    
                    for(let i = 0; i < rowsToDelete; i++){
                        await db.ProductsColor.destroy({
                            where: {
                                product_id: req.params.id,
                                color_id: colorsToEdit[i].dataValues.color_id,
                                id: colorsToEdit[i].dataValues.id
                            }
                        });
                    }

                    let rowsToEdit = await db.ProductsColor.findAll({
                        where: {
                            product_id: req.params.id
                        }
                    });

                    for(let i = 0; i < newColors.length; i++){
                        await db.ProductsColor.update({
                            color_id: newColors[i]
                        }, {
                            where: {
                                product_id: req.params.id,
                                id: rowsToEdit[i].dataValues.id
                            }
                        });
                    }
                } else {
                    for(let i = 0; i < newColors.length; i++){
                        await db.ProductsColor.update({
                            color_id: newColors[i]
                        }, {
                            where: {
                                product_id: req.params.id,
                                id: colorsToEdit[i].dataValues.id
                            }
                        });
                    }
                }

                res.redirect('/products/detail/' + req.params.id);
            } catch (error) {
                throw error;
            }
        }
    },
    deleteProduct: async (req,res) => {
        try {
            // Borra la fila relacionada al producto de la tabla images
            await db.Image.destroy({
                where: {
                    product_id: req.params.id
                }
            });
            // Borra la fila relacionada al producto de la tabla products_colors
            await db.ProductsColor.destroy({
                where: {
                    product_id: req.params.id
                }
            });
            // Borra la fila relacionada al producto de la tabla cart_products
            await db.CartProducts.destroy({
                where: {
                    product_id: req.params.id
                }
            });
            // Borra la fila relacionada al producto de la tabla products
            await db.Product.destroy({
                where: {
                    id: req.params.id
                }
            });

            return res.redirect("/");
        } catch (error) {
            throw error;
        }
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
    editCategory: async (req, res) => {
        try {
            // Busca la categoría a editar
            let category = await db.Category.findByPk(req.params.id);

            return res.render('products/categoryEdit', {category}); 
        } catch (error) {
            throw error;
        }
    },
    updateCategory: async (req, res) => {
        try {
            const result = validationResult(req);

            if(result.errors.length > 0){
                // Busca la categoría a editar
                let origCategory = await db.Category.findByPk(req.params.id);
                // Recupera la información del form
                let editedCategory = req.body;
                editedCategory.id = origCategory.id;
                editedCategory.prevName = origCategory.name;

                return res.render('products/categoryEdit', {category: editedCategory, errors: result.mapped()});
            } else {
                let editedCategory = await db.Category.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                
                return res.redirect('/');
            }           
        } catch (error) {
            throw error;
        }
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