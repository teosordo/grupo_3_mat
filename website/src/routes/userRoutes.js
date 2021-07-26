const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const userController = require('../controllers/userController');

const login = require('../middlewares/loginValidator');
const userAccess = require('../middlewares/userAccess');
const hostAccess = require('../middlewares/hostAccess');
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
router.get('/login',[hostAccess], userController.login);
router.post('/login',[hostAccess, login], userController.loginProcess);
// Register
router.get('/register',[hostAccess], userController.register);
router.post('/register',[hostAccess, upload.single('avatar'), registerMiddleware], userController.createUser);
// Product Cart
router.get('/cart',[userAccess], userController.productCart);
//User List
router.get('/list', userController.userlist);
// Profile
router.get('/profile', [userAccess], userController.userProfile);
// Logout
router.post('/logout', [userAccess], userController.logout);

module.exports = router;