const db = require('../../database/models')

const productController = {
    index: async (req, res) => {
        try {
            let idPage = parseInt(req.params.id);
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
            const products = await db.Product.findAll({
                include: ['brand','category'], 
                attributes: ['id','name','characteristics','stock'],
                offset: (idPage-1) * settingNumber,
                limit: settingNumber});
            //Numero total de productos
            const totalProducts = await db.Product.count();
            
            //Redireccion a primera pagina si el ID de la url es mayor a la cantidad de paginas o si es 0
            let totalNumPages = Math.ceil(totalProducts / settingNumber);

            if(idPage == 0 || idPage > totalNumPages){
                res.redirect('/api/products/1')
            };

            //Agregando link para detalle producto
            products.forEach(product =>{
                product.dataValues.detail = `http://localhost:3000/api/products/detail/${product.id}`
            });

            res.status(200).json({status:200, count: totalProducts, countByCategory:newArray, products: products})

        }catch (error) {
            throw error;
        }
    },
    detail: async (req,res)=>{
        try {
            //No se asocia con brands
            const product = await db.Product.findByPk(req.params.id, {
                include:['category', 'images', 'colors'] //faltan atributes
            });            
            // Array de images
            let imagesArray = []
            for(const image of product.images){
                imagesArray.push(`http://localhost:3000/uploads/products/${image.name}`)
            }
            res.status(200).json({
                status:200,
                id: product.id,
                name: product.name,
                brand_id: product.brand_id,
                category_id: product.category_id,
                originalPrice: product.originalPrice,
                price: product.price,
                stock: product.stock,
                discount: product.discount,
                warranty: product.warranty,
                images: imagesArray,
                video: product.video,
                characteristics: product.characteristics,
                specs: product.specs
            })
        } catch (error) {
            throw error;
        }
    }
};

module.exports = productController;