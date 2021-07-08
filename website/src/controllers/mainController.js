const productsFunctions = require('../models/product')
const categoryFunctions = require('../models/category')
const mainController = {
    index: (req, res) => {
        // pasar a middleware
        let finalPrice = (price, discount) => {
            let restante = (price * discount) / 100;
            return price - restante;
        }

        res.render('index', {products: productsFunctions.all(), category: categoryFunctions.all(), finalPrice: finalPrice});
    }
        
};
module.exports = mainController;