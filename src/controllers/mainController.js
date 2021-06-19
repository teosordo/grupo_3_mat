const productsFunctions = require('../models/product')
const products = productsFunctions.all()
const mainController = {
    index: (req, res) => {
        res.render('index', {product: products});
    }
};
module.exports = mainController;