const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');
const createValidations = require('../middlewares/createValidator')
const editValidations = require('../middlewares/editValidator')

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
router.get('/',productController.listProduct);
// Product Detail
router.get('/detail/:id',productController.productDetail);
//Product Create
router.get('/create',productController.newProduct);
router.post('/create',[upload.single('image'),createValidations],productController.createProduct);
//Product Edit
router.get('/:id/edit', productController.productEdit);
router.put('/:id', [upload.single('image'),editValidations], productController.update);
router.delete("/:id",productController.deleteAll);

module.exports = router;