const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productController = require('../controllers/productController');
const categoryCreateValidator = require('../middlewares/products/categoryCreate');
const categoryEditValidator = require('../middlewares/products/categoryEditValidator');
const brandCreateValidator = require('../middlewares/products/brandCreate');
const brandEditValidator = require('../middlewares/products/brandEdit');
const colorCreateValidator = require('../middlewares/products/colorCreate');
const colorEditValidator = require('../middlewares/products/colorEdit');
const createValidations = require('../middlewares/products/createValidator');
const editValidations = require('../middlewares/products/editValidator');
const adminAccess = require('../middlewares/users/adminAccess');
const userAccess = require('../middlewares/users/userAccess')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname,'../../public/uploads/products'))
    },
    filename:(req,file,cb)=>{
        let oldName = file.originalname.split('.')
        oldName = oldName[0]
        cb(null, file.fieldname + '-' + Date.now() + oldName + path.extname(file.originalname))
    }
})

const upload = multer({storage})

//Product List
router.get('/list/:id/:categoryId?', productController.listProduct);
// Product Admin Options 
router.get('/options',[adminAccess], productController.adminOptions);
// Product Detail
router.get('/detail/:id', productController.productDetail);

//Product Create
router.get('/create', [adminAccess], productController.newProduct);
router.post('/create', [adminAccess, upload.single('image'), createValidations],productController.createProduct); // upload.array('image')
//Brand Create
router.get('/create/brand', [adminAccess],productController.newBrand);
router.post('/create/brand', [adminAccess, brandCreateValidator],productController.createBrand);
//Brand Edit
router.get('/edit/brandList',[adminAccess], productController.brandList);
router.get('/edit/brand/:id', [adminAccess], productController.editBrand);
router.put('/edit/brand/:id', [adminAccess, brandEditValidator], productController.updateBrand);
router.delete('/brand/delete/:id', [adminAccess], productController.deleteBrand)
//Category Create
router.get('/create/category', [adminAccess],productController.newCategory);
router.post('/create/category', [adminAccess, categoryCreateValidator],productController.createCategory);
//Category Edit
router.get('/edit/categoryList', [adminAccess], productController.categoryList);
router.get('/edit/category/:id', [adminAccess], productController.editCategory);
router.post('/edit/category/:id', [adminAccess, categoryEditValidator], productController.updateCategory);
router.delete('/category/delete/:id',[adminAccess], productController.deleteCategory)
//Color Create
router.get('/create/color', [adminAccess],productController.newColor);
router.post('/create/color', [adminAccess, colorCreateValidator],productController.createColor);
//Color Edit 
router.get('/edit/colorList', [adminAccess], productController.colorList);
router.get('/edit/color/:id', [adminAccess], productController.editColor);
router.put('/edit/color/:id', [adminAccess, colorEditValidator], productController.updateColor);
router.delete('/color/delete/:id',[adminAccess], productController.deleteColor)
//Product Edit
router.get('/:id/edit', [adminAccess], productController.productEdit);
router.get('/edit', productController.editProductList)
router.put('/:id', [adminAccess, upload.single('image'),editValidations], productController.updateProduct); // upload.array('image')
router.post('/redirect', productController.editRedirect);
router.delete("/:id", [adminAccess], productController.deleteProduct);

module.exports = router;