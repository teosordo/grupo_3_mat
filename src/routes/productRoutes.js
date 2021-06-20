const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname,'../../public/imgs/index'))
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

// Product Detail
//router.get('/productDetail', productController.productDetail);
router.get('/productDetail/:id', productController.productDetail);
router.get('/product/create', productController.productNewProduct);
router.post('/product/create',upload.single('img') ,productController.productCreate);
router.get('/product/edit/?:id', productController.productEdit);
module.exports = router;