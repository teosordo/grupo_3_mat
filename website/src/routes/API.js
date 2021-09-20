const express = require('express');
const router = express.Router();
const productController = require('../controllers/API/productsAPI');
const usersController = require('../controllers/API/usersAPI');

// Products List
router.get('/products', productController.index);
// Product Detail
router.get('/products/:id', productController.detail);
// Users List
router.get('/users', usersController.list);
// User Detail
router.get('/users/:id', usersController.detail);


module.exports = router;