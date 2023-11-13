import express from 'express'
import userCtrl from '../controller/userController.js'
import authCtrl from '../controller/authController.js'
const router = express.Router();


//get all user, create a new user and delete all users at this endpoint
router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)
    .delete(userCtrl.deleteAllUsers);

// get, update, and delete on id at this endpoint
// checks for verification through the authCtrl
router.route('/api/users/:id')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.deleteUser);

//set paramater for id
router.param('id', userCtrl.userById);

export default router;