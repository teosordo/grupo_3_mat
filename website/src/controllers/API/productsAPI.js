const db = require('../../database/models')

const productController = {
    index: async (req, res) => {
        try {

            let idPage = parseInt(req.params.id);
            if(idPage == 0){
                res.redirect('/api/products/1')
            };
            let settingNumber = 10


            //Cosas para contar productos por categorias 
            const categories = await db.Category.findAll();
            let newArray = [];
            categories.forEach(async category =>{
                let categoryProductTotal = await db.Product.count({where:{category_id: category.id}})
                let categoryCount = {name: category.name, total: categoryProductTotal}
                newArray.push(categoryCount);
            });

            //Cosas para Productos
            const products = await db.Product.findAll({
                include: ['brand','category'], 
                attributes: ['id','name','characteristics'],
                offset: (idPage-1) * settingNumber,
                limit: settingNumber});
            
            const totalProducts = await db.Product.count();
            
            //Agregando link para detalle producto
            products.forEach(product =>{
                product.dataValues.detail = `http://localhost:3000/api/products/${product.id}`
            });

            res.status(200).json({status:200, count: totalProducts, countByCategory:newArray, products: products})

        }catch (error) {
            throw error;
        }
    },
    oneProduct: async (req,res)=>{

    }
};

module.exports = productController;