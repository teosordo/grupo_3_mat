const productsFunctions = require('../models/product')
const categoryFunctions = require('../models/category')
const mainController = {
    index: (req, res) => {
        res.render('index', {products: productsFunctions.all(), category: categoryFunctions.all()});
    }
        
};
module.exports = mainController;