const express = require('express');
const router = express.Router();
const productController = require('../controllers/API/APIproductController');

// Index
router.get('/products', productController.index);


module.exports = router;