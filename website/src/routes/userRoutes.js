const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userController = require('../controllers/userController');
const state = require('../middlewares/state');
const loginMiddleware = require('../middlewares/loginValidator');
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
router.get('/login',[state],userController.login);
router.post('/login',[state,loginMiddleware], userController.loginProcess);
// Register
router.get('/register',[state],userController.register);
router.post('/register',[state,upload.single('avatar'),registerMiddleware],userController.createUser);
// Product Cart
router.get('/cart',[state],userController.productCart);
router.get('/list',[state],userController.userlist);
module.exports = router;