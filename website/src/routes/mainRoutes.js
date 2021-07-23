const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const state = require('../middlewares/state');

// Index
router.get('/',mainController.index);

// Maintainment View
router.get('/maintainment', mainController.maintainment);

module.exports = router;