import product from '../controller/productController.js'
import express from 'express'

const router = express.Router();

//get list of products, create new product, and delete all products at this endpoint
router.route('/products')
    .get(product.listProducts)
    .post(product.createProduct)
    .delete(product.deleteAllProducts);

router.route('/products/:id')
    .get(product.readProduct)
    .put(product.updateProduct)
    .delete(product.deleteProduct);

router.param('id', product.productById);

export default router;