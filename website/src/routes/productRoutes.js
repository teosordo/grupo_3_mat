const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname,'../../public/imgs/uploads'))
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

//Product List
router.get('/', productController.listProduct);
// Product Detail
router.get('/productDetail/:id?', productController.productDetail);
//Product Create
router.get('/create', productController.productNewProduct);
router.post('/create',upload.single('img') ,productController.productCreate);
//Product Edit
router.get('/edit/:id?', productController.productEdit);
module.exports = router;