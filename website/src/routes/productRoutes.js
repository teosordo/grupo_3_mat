const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname,'../../public/uploads/products'))
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

//Product List
router.get('/', productController.listProduct);
// Product Detail
router.get('/:id', productController.productDetail);
//Product Create
router.get('/create', productController.productNewProduct);
router.post('/create',upload.single('image') ,productController.productCreate);
//Product Edit
router.get('/:id/edit', productController.productEdit);
module.exports = router;