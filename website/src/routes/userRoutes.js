const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');
const registerMiddleware = require('../middlewares/registerValidator');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname,'../../public/uploads/users'));
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage})

// Login
router.get('/login', userController.login);
router.post('/login', userController.loginProcess);
// Register
router.get('/register', userController.register);
router.post('/register',[upload.single('avatar'),registerMiddleware],userController.createUser);
// Product Cart
router.get('/cart', userController.productCart);
router.get('/test/:id', userController.userTest);
module.exports = router;