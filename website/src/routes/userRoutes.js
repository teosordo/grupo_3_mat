const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Login
router.get('/login', userController.login);

// Register
router.get('/register', userController.register);

// Product Cart
router.get('/cart', userController.productCart);

module.exports = router;