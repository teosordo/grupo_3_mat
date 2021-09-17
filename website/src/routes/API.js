const express = require('express');
const router = express.Router();
const productController = require('../controllers/API/APIproductController');
const usersController = require('../controllers/API/usersAPI');

// Products List
router.get('/products', productController.index);
// Product Detail

// Users List
router.get('/users', usersController.list);
// User Detail
router.get('/users/:id', usersController.detail);


module.exports = router;