const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const state = require('../middlewares/state');

// Index
router.get('/',[state],mainController.index);

module.exports = router;