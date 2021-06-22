const productsFunctions = require('../models/product')

const mainController = {
    index: (req, res) => {
        const products = productsFunctions.all();
        res.render('index', {product: products});
    }
        
};
module.exports = mainController;