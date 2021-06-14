const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product Detail
//router.get('/productDetail', productController.productDetail);
router.get('/productDetail/:id', productController.productDetail);

module.exports = router;