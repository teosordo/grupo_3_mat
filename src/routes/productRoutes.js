const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Product Detail
//router.get('/productDetail', productController.productDetail);
router.get('/productDetail/:id', productController.productDetail);
router.get('/product/create', productController.productNewProduct);
router.get('/product/edit/:id', productController.productEdit);
module.exports = router;