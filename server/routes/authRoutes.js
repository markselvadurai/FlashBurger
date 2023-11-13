// this file is used to handle authentication endpoints such as signin and sign out
import express from 'express'
import authCtrl from '../controller/authController.js'
const router = express.Router();


//execute the signin middleware when a post request is made to the endpoint
router.route('/auth/signin').post(authCtrl.signin);

//execute the signout middleware when a get request is made to the endpoint
router.route('/auth/signout').get(authCtrl.signout);

export default router;