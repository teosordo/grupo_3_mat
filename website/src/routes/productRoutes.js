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
router.get('/list/:id', productController.listProduct);
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
//Brand Edit
router.get('/edit/brandList', productController.brandList)
router.get('/edit/brand/:id', productController.editBrand)
router.put('/edit/brand/:id', productController.updateBrand)
//Category Create
router.get('/create/category', [adminAccess],productController.newCategory);
router.post('/create/category', [adminAccess],productController.createCategory);
//Category Edit
router.get('/edit/categoryList', [adminAccess], productController.categoryList);
router.get('/edit/category/:id', [adminAccess], productController.editCategory);
router.post('/edit/category/:id', [adminAccess, categoryEditValidator], productController.updateCategory);
//Color Create
router.get('/create/color', [adminAccess],productController.newColor);
router.post('/create/color', [adminAccess],productController.createColor);
//Color Edit 
router.get('/edit/colorList', productController.colorList)
router.get('/edit/color/:id', productController.editColor)
router.put('/edit/color/:id', productController.updateColor)
//Product Edit
router.get('/:id/edit', [adminAccess], productController.productEdit);
router.get('/edit', productController.editProductList)
router.put('/:id', [adminAccess, upload.single('image'),editValidations], productController.updateProduct);
router.post('/redirect', productController.editRedirect);
router.delete("/:id", [adminAccess], productController.deleteProduct);

module.exports = router;