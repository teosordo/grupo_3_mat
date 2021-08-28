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
    //console.log(price);
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
            // Guarda el query
            let search;
            // Guarda el id de la categoría
            let categoryId;
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
                
                productsTotalCount = await db.Product.count({
                    where: {
                        name: {[db.Sequelize.Op.like]: `%${req.query.searchbar}%`}
                    }
                });

                search = req.query.searchbar;
                
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

                productsTotalCount = await db.Product.count({
                    where: {
                        category_id: req.params.categoryId
                    }
                });

                categoryId = req.params.categoryId;
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

            if(req.params.id > totalNumPages){
                res.redirect('/products/list/1')
            };
            return res.render('products/productList', {products, category, idPage, productsTotalCount, pages: totalNumPages, search, categoryId});
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
        const product = await db.Product.findByPk(req.params.id, {include: ['images', 'colors']});
        const brands = await db.Brand.findAll();
        const categories = await db.Category.findAll();
        const colors = await db.Color.findAll();

        return product == false ? res.redirect('/') : res.render('products/productEdit',{product, brands, categories, colors});
        } catch (error) {
            throw error;
        }
        
    },
    editProductList: async (req, res) => {
        try {
            let products = await db.Product.findAll();
            return res.render('products/productEditList', {products})
        } catch (error) {
            throw error
        }
    },
    editRedirect: (req, res) => {
        try {
            //console.log(req.body.product? true: false);
            if (req.body.product){
                res.redirect(`/products/${req.body.product}/edit`)
            }else if(req.body.brand){
                res.redirect(`/products/edit/brand/${req.body.brand}`)
            }else if(req.body.category){
                res.redirect(`/products/edit/category/${req.body.category}`)
            }else{
                res.redirect(`/products/edit/color/${req.body.color}`)
            }
        } catch (error) {
            throw error;
        }
    },
    updateProduct: async (req, res) => {
        const result = validationResult(req);
        const product = await db.Product.findByPk(req.params.id, {include:['images']});

        if(result.errors.length > 0){
            // data para usar en el view  
            const brands = await db.Brand.findAll();
            const categories = await db.Category.findAll();
            const colors = await db.Color.findAll();

            let editedProduct = req.body;
            editedProduct.id = product.id;
            editedProduct.images = product.images;
            editedProduct.prevColors = editedProduct.colors;
            editedProduct.prevName = product.name;

            return res.render('products/productEdit',{brands, categories, colors, errors: result.mapped(), product: editedProduct});
        }else{
            try {
                // Edita la tabla de products
                const editProduct = await product.update({
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
                });

                // Edita la tabla de images
                if(req.file){
                    const editImages = await db.Image.update({
                        name: req.file.filename
                    }, {
                        where: {
                            product_id: req.params.id
                        }
                    });
                }

                // convierte en array los colores entrantes
                let newColors = req.body.colors;
                if(!Array.isArray(newColors)){
                    newColors = Array.of(newColors);
                }

                // Edita la tabla intermedia que conecta con colors 
                const editColors = await product.setColors(newColors);

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
    brandList: async (req, res) => {
        try {
            let brands = await db.Brand.findAll();
            res.render('products/productBrandList', {brands})
        } catch (error) {
            throw error
        }
    },
    createBrand: async (req, res) => {
        try {
            let result = validationResult(req);
            if(result.errors.length > 0){
                res.render('products/productBrand', {brand: req.body, errors: result.mapped()})
            }else{
                let newBrand = await db.Brand.create(req.body);
                return res.redirect('/');  
            }
        } catch (error) {
            throw error;
        }
    },
    editBrand: async (req, res) => {
        res.render('products/productBrandEdit', {brand: await db.Brand.findOne({where: {id: req.params.id}})})
    }
    ,
    updateBrand: async (req, res) => {
        try {
            let result = validationResult(req);
            if (result.errors.length > 0) {
                // Busca la categoría a editar
                let origBrand = await db.Brand.findByPk(req.params.id);
                // Recupera la información del form
                let editedBrand = req.body;
                editedBrand.id = origBrand.id;
                editedBrand.prevName = origBrand.name;

                res.render('products/productBrandEdit', {brand: editedBrand, errors: result.mapped()});
            }else{
                await db.Brand.update(req.body,{
                    where:{
                        id: req.params.id
                    }
                });
                res.redirect('/')
            }  
        } catch (error) {
            throw error;
        }
    },
    deleteBrand: async (req, res) => {
        try {
            await db.Brand.destroy({where:{id: req.params.id}})
            res.redirect('/products/edit/brandList')
        } catch (error) {
            throw error
        }
    },
    newCategory: (req, res) => {
        res.render('products/productCategory')
    },
    categoryList: async (req, res) => {
        try {
            let categories = await db.Category.findAll();
            res.render('products/productCategoryList', {categories})
        } catch (error) {
            throw error
        }
    },
    createCategory: async (req, res) => {
        let result = validationResult(req);
        if(result.errors.length > 0 ){
           res.render('products/productCategory', {category: req.body, errors: result.mapped()})
        }else{
            let newCategory = await db.Category.create(req.body)
            return res.redirect('/')  
        }
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
    deleteCategory: async (req, res) => {
        try {
            await db.Category.destroy({where:{id: req.params.id}})
            res.redirect('/products/edit/categoryList')
        } catch (error) {
            throw error
        }
    },
    newColor:  (req, res) => {
        res.render('products/productColor')
    },
    colorList: async (req, res) => {
        try {
            let colors = await db.Color.findAll();
            res.render('products/productColorList', {colors})
        } catch (error) {
            throw error
        }
    },
    createColor: async (req, res) => {
        try {
            let result = validationResult(req);
            if (result.errors.length > 0){
                res.render('products/productColor', {color: req.body, errors: result.mapped()});
            }else{
                let newColor = await db.Color.create(req.body);
                return res.redirect('/');
            } 
        } catch (error) {
            throw error;
        }
        
    },
    editColor: async (req, res) => {
        res.render('products/productColorEdit', {color: await db.Color.findOne({where:{id: req.params.id}})})
    },
    updateColor: async (req, res) => {
        let result = validationResult(req);
        if (result.errors.length > 0) {
            let origColor = await db.Color.findByPk(req.params.id);
            console.log(origColor.id);
            let editedColor = req.body;
            editedColor.id = origColor.id;
            console.log(editedColor.id);
            editedColor.prevName = origColor.name;
            res.render('products/productColorEdit', {color: editedColor, errors: result.mapped()});
        }else{
            await db.Color.update(req.body,{
                where:{
                    id: req.params.id
                }
            });
            res.redirect('/')
        }
    },
    deleteColor: async (req, res) => {
        try {
            await db.Color.destroy({where:{id: req.params.id}})
            res.redirect('/products/edit/colorList')
        } catch (error) {
            throw error
        }
    }
};

module.exports = productController;