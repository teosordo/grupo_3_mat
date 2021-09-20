const db = require('../../database/models')

const productController = {
    index: async (req, res) => {
        try {
            //Cosas para contar productos por categorias 
            const categories = await db.Category.findAll();
            let newArray = [];
            categories.forEach(async category =>{
                let categoryProductTotal = await db.Product.count({where:{category_id: category.id}})
                let categoryCount = {name: category.name, total: categoryProductTotal}
                newArray.push(categoryCount);
            });

            //Cosas para Productos
            const products = await db.Product.findAll({include: ['brand','category'], attributes: ['id','name','characteristics']})
            const totalProducts = products.length;
            
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