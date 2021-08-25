const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const userController = require('../controllers/userController');

const login = require('../middlewares/users/loginValidator');
const register = require('../middlewares/users/registerValidator');
const userAccess = require('../middlewares/users/userAccess');
const hostAccess = require('../middlewares/users/hostAccess');
const adminCheck = require('../middlewares/users/adminCheck');
const adminAccess = require('../middlewares/users/adminAccess');
const edit = require('../middlewares/users/editValidator');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname,'../../public/uploads/users'));
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + file.originalname + path.extname(file.originalname));
    }
});

const upload = multer({storage})

// Login
router.get('/login',[hostAccess], userController.login);
router.post('/login',[hostAccess, login, adminCheck], userController.loginProcess);
// Register
router.get('/register',[hostAccess], userController.register);
router.post('/register',[hostAccess, upload.single('avatar'), register], userController.createUser);
// Product Cart
router.get('/cart',[userAccess], userController.productCart);
router.post('/cart/add/:id',[userAccess], userController.productCartAdd)
router.delete('/cart/:id',[userAccess], userController.productCartDelete)
//User List
router.get('/list/:id',[adminAccess], userController.userlist);
// Profile
router.get('/profile', [userAccess], userController.userProfile);
// Logout
router.post('/logout', [userAccess], userController.logout);
// Usuarios editan su info
router.get('/edit/:id', [userAccess], userController.userEdit);
router.put('/update/:id', [userAccess, upload.single('avatar'), edit], userController.userUpdate);
router.post('/delete/:id', [userAccess], userController.userDelete);
// Admin elimina usuario
router.get('/profile/:id', [adminAccess], userController.profile);
router.post('/destroy/:id', [adminAccess], userController.delete);

module.exports = router;