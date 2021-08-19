const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productController = require('../controllers/productController');
const categoryEditValidator = require('../middlewares/products/categoryEditValidator');

const createValidations = require('../middlewares/products/createValidator');
const editValidations = require('../middlewares/products/editValidator');
const adminAccess = require('../middlewares/users/adminAccess');
const userAccess = require('../middlewares/users/userAccess')
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
router.get('/list/:id/:categoryId?', productController.listProduct); // preguntar
// Product Admin Options 
router.get('/options',[adminAccess], productController.adminOptions);
// Product Detail
router.get('/detail/:id', productController.productDetail);

//Product Create
router.get('/create', [adminAccess], productController.newProduct);
router.post('/create', [adminAccess, upload.single('image'), createValidations],productController.createProduct);
//Brand Create
router.get('/create/brand', [adminAccess],productController.newBrand);
router.post('/create/brand', [adminAccess],productController.createBrand);
//Category Create
router.get('/create/category', [adminAccess],productController.newCategory);
router.post('/create/category', [adminAccess],productController.createCategory);
//Category Edit
router.get('/edit/category/:id', [adminAccess], productController.editCategory);
router.post('/edit/category/:id', [adminAccess, categoryEditValidator], productController.updateCategory);
//Color Create
router.get('/create/color', [adminAccess],productController.newColor);
router.post('/create/color', [adminAccess],productController.createColor);
//Product Edit
router.get('/:id/edit', [adminAccess], productController.productEdit);
router.put('/:id', [adminAccess, upload.single('image'),editValidations], productController.updateProduct);
router.delete("/:id", [adminAccess], productController.deleteProduct);
module.exports = router;