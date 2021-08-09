const productsFunctions = require('../models/product')
const categoryFunctions = require('../models/category')
const db = require('../database/models')
const mainController = {
    index: async (req, res) => {
        try {
            /*Productos completos*/
            let products = await db.Product.findAll({
                include:['colors','brand','category','images']
            });
            /*Categorias para el navbar*/
            let category = await db.Category.findAll();
            /*Calcula el descuento que tiene el producto*/
            let finalPrice = (price, discount) => {
                let restante = (price * discount) / 100;
                return price - restante;
            };
            return res.render('index', {products, category, finalPrice});
        }catch (error) {
            throw error;
        }
    },
    maintainment: (req, res) => {
        res.render('maintainment');
    }
        
};
module.exports = mainController;