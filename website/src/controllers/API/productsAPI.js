const db = require('../../database/models')

const productController = {
    index: async (req, res) => {
        try {
            let idPage = parseInt(req.params.id);
            if(idPage == 0){
                res.redirect('/api/products/1')
            };
            //Numero para setear el limit 
            let settingNumber = 10
            //Buscando categorias
            const categories = await db.Category.findAll();
            //Buscando la cantidad de productos en cada categoria y pusheandola al array
            let newArray = [];
            categories.forEach(async category =>{
                let categoryProductTotal = await db.Product.count({where:{category_id: category.id}})
                let categoryCount = {name: category.name, total: categoryProductTotal}
                newArray.push(categoryCount);
            });

            //Buscando los productos
            if(req.params.id == undefined){
                var products = await db.Product.findAll({
                    include: ['brand','category'], 
                    attributes: ['id','name','characteristics','stock'],
                });
            }else{
                var products = await db.Product.findAll({
                    include: ['brand','category'], 
                    attributes: ['id','name','characteristics','stock'],
                    offset: (idPage-1) * settingNumber,
                    limit: settingNumber});
            }
            //Numero total de productos
            const totalProducts = await db.Product.count();
            
            //Redireccion a primera pagina si el ID de la url es mayor a la cantidad de paginas o si es 0
            let totalNumPages = Math.ceil(totalProducts / settingNumber);


            if(idPage > totalNumPages){
                res.redirect(`/api/products/${totalNumPages}`)
            }
            //Agregando link para detalle producto
            products.forEach(product =>{
                product.dataValues.detail = `http://localhost:3000/api/products/detail/${product.id}`
            });

            res.status(200).json({status:200, count: totalProducts, countByCategory:newArray, products})

        }catch (error) {
            throw error;
        }
    },
    detail: async (req,res)=>{
        try {
            //No se asocia con brands
            const product = await db.Product.findByPk(req.params.id, {
                include:['category', 'images', 'colors', 'brand']
            });
            //Envia error si no se encuentra el producto
            if(product == null){
                res.status(404).json({
                    status:404,
                    error: 'No se encontró el producto'
                })
            };
            // Array de images
            let imagesArray = []
            for(const image of product.images){
                imagesArray.push(`http://localhost:3000/uploads/products/${image.name}`)
            }
            // Array de colores
            let colorsArray = []
            for(const color of product.colors){
                colorsArray.push({
                    id: color.dataValues.id,
                    name: color.dataValues.name
                })
            }
            res.status(200).json({
                status:200,
                id: product.id,
                name: product.name,
                originalPrice: product.originalPrice,
                price: product.price,
                stock: product.stock,
                discount: product.discount,
                warranty: product.warranty,
                images: imagesArray,
                video: product.video,
                characteristics: product.characteristics,
                specs: product.specs,
                category: product.category,
                brand: product.brand,
                colors: colorsArray
            })
        } catch (error) {
            throw error;
        }
    }
};

module.exports = productController;