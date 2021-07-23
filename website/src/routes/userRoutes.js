const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const userController = require('../controllers/userController');

const state = require('../middlewares/state');
const userLogged = require('../middlewares/logged');
const auth = require('../middlewares/auth');
const login = require('../middlewares/loginValidator');
const admin = require('../middlewares/admin');
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
router.get('/login',[hostAccess],userController.login);
router.post('/login',[userLogged,login,admin], userController.loginProcess);
// Register
router.get('/register',[hostAccess],userController.register);
router.post('/register',[upload.single('avatar'),registerMiddleware],userController.createUser);
// Product Cart
router.get('/cart',[userAccess],userController.productCart);
//User List
router.get('/list',userController.userlist);
// Profile
router.get('/:id', [userAccess], userController.userProfile);

module.exports = router;