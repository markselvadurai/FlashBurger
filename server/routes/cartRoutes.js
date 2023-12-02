import cart from '../controller/cartController.js'
import userCtrl from '../controller/userController.js'
import express from 'express'
import authCtrl from '../controller/authController.js'

const router = express.Router();

//add item to cart, and remove item from cart when user is logged in
router.route('/api/users/:id/cart')
    .get(authCtrl.requireSignin, cart.readCart)
    .post(authCtrl.requireSignin, cart.addToCart)
    .delete(authCtrl.requireSignin, cart.removeItem);

router.param('id', userCtrl.userById);

export default router;