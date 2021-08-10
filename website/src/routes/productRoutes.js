const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productController = require('../controllers/productController');

const createValidations = require('../middlewares/products/createValidator');
const editValidations = require('../middlewares/products/editValidator');
const adminAccess = require('../middlewares/users/adminAccess');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname,'../../public/uploads/products'))
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + file.originalname + path.extname(file.originalname))
    }
})

const upload = multer({storage})

//Product List
router.get('/', productController.listProduct);
// Product Admin Options 
router.get('/options',[adminAccess], productController.adminOptions);
// Product Detail
router.get('/detail/:id', productController.productDetail);
//Product Create
router.get('/create', [adminAccess], productController.newProduct);
router.post('/create', [adminAccess, upload.single('image'), createValidations],productController.createProduct);
router.post('/create/brand', [adminAccess, createValidations],productController.createBrand);
router.post('/create/category', [adminAccess, createValidations],productController.createCategory);
router.post('/create/color', [adminAccess, createValidations],productController.createColor);
//Product Edit
router.get('/:id/edit', [adminAccess], productController.productEdit);
router.put('/:id', [adminAccess, upload.single('image'),editValidations], productController.update);
router.delete("/:id", [adminAccess], productController.deleteAll);
//Product Categories
router.get('/categories', [adminAccess], productController.categories);
module.exports = router;