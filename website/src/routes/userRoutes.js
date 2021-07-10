const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname,'../../public/uploads/products'));
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage})
// Login
router.get('/login', userController.login);
router.post('/login', userController.loginProcess);
// Register
router.get('/register', userController.register);
router.get('/register/list', userController.createUser);
// Product Cart
router.get('/cart', userController.productCart);

module.exports = router;