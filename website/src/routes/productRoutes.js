const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productController = require('../controllers/productController');

const createValidations = require('../middlewares/createValidator');
const editValidations = require('../middlewares/editValidator');
const adminAccess = require('../middlewares/adminAccess');

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
router.get('/detail/:id', productController.productDetail);
//Product Create
router.get('/create', [adminAccess], productController.newProduct);
router.post('/create', [adminAccess, upload.single('image'), createValidations],productController.createProduct);
//Product Edit
router.get('/:id/edit', [adminAccess], productController.productEdit);
router.put('/:id', [adminAccess, upload.single('image'),editValidations], productController.update);
router.delete("/:id", [adminAccess], productController.deleteAll);

module.exports = router;