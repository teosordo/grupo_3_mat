const product = require('../../public/js/productos')
const mainController = {
    index: (req, res) => {
        res.render('index', {product: product});
    }
};
module.exports = mainController;