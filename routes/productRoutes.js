const express = require ('express');
const router = express.Router();
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productControllers');



router.post('/product', createProduct);
router.get('/products', getAllProducts);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);


module.exports = router;
