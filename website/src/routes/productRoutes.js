const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');
const state = require('../middlewares/state');
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
router.get('/',[state],productController.listProduct);
// Product Detail
router.get('/detail/:id',[state],productController.productDetail);
//Product Create
router.get('/create',[state],productController.newProduct);
router.post('/create',[state,upload.single('image'),createValidations],productController.createProduct);
//Product Edit
router.get('/:id/edit', productController.productEdit);
router.put('/:id', [state,upload.single('image'),editValidations], productController.update);
router.delete("/:id",[state],productController.deleteAll);

module.exports = router;