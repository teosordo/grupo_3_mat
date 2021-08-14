const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const userController = require('../controllers/userController');

const login = require('../middlewares/users/loginValidator');
const userAccess = require('../middlewares/users/userAccess');
const hostAccess = require('../middlewares/users/hostAccess');
const adminCheck = require('../middlewares/users/adminCheck');
const adminAccess = require('../middlewares/users/adminAccess');

const registerMiddleware = require('../middlewares/users/registerValidator');

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
router.post('/login',[hostAccess, login, adminCheck], userController.loginProcess);
// Register
router.get('/register',[hostAccess], userController.register);
router.post('/register',[hostAccess, upload.single('avatar'), registerMiddleware], userController.createUser);
// Product Cart
router.get('/cart',[userAccess], userController.productCart);
//Add item Cart
router.post('/cart/add/:id',[userAccess], userController.productCartAdd)
//User List
router.get('/list',[adminAccess], userController.userlist);
// Profile
router.get('/profile', [userAccess], userController.userProfile);
// Logout
router.post('/logout', [userAccess], userController.logout);
// Editar User
router.get('/edit/:id', [adminAccess], userController.userEdit);
router.put('/update/:id', [adminAccess], userController.userUpdate);
router.delete('/delete/:id', [adminAccess], userController.userDelete);

module.exports = router;