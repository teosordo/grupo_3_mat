const productsFunctions = require('../models/product')

const mainController = {
    index: (req, res) => {
        res.render('index', {products: productsFunctions.allComplete()});
    }
        
};
module.exports = mainController;