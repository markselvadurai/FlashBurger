//this file contains the middleware functions that are called at the endpoints in the authRoutes file
// this file will also enable authentication through JWT

import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from './../../config/config.js'

const signin = async (req,res) => {
    try{
        //look for the username
        let user = await User.findOne({'username' : req.body.username});

        //if  no user is found with that username
        if(!user){
            return res.status(400).json({error: 'User not found'});
        }

        //if they fail authentication, authenticate method can be found in the userModel
        if(!user.authenticate(req.body.password)){
            //return a generic error message
            return res.status(400).json({error: 'Username and password do not match'});
        }

        //if everything is good then create jwt token 
        const token = jwt.sign({_id : user._id}, config.jwtSecret);
        res.cookie('t', token, {expire: new Date() + 9999, httpOnly: true, secure: process.env.NODE_ENV === 'production'});
        //return to the client the following
        return res.json({
            token,
            user:{
                _id : user._id,
                username: user.username,
                email: user.email
            }
        });
    }catch (err){
        return res.json({error: 'Could not sign in'});
    }
}

//sign out will clear the cookies, mainly the jwt token
const signout = (req,res) => {
    try{
        //get rid of the follwing cookie on the client side
    res.clearCookie('t');
    return res.status(200).json({message: 'User signed out'});

    }catch(err){
        return res.status(400).json({error: 'Ran into an error: ' + err});
    }
}

//using the expressJWT function, passing the secret and the property to give users
const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'auth',
    getToken: (req) => {
        if (req.cookies && req.cookies.t) {
          return req.cookies.t;
        }
        return null;
      },
});

//to ensure users can only update, delete their own profile
const hasAuthorization = (req,res, next) =>{
    //ensure everything matches
    //req.auth is the user object that is available after user has been authenticated in the requireSignin middleware
    console.log('hel')
    const auth = req.profile && req.auth && req.profile._id == req.auth._id;
    // if not display error
    if(!auth){
        return res.status(403).json({error: 'This user is not authorized to access this information'});
    }
    next();
}

const loggedIn = (req,res) => {
    const token = req.cookies.t;

    if (!token) {
        return res.json({val: false})
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        res.json({val: true,
            user:{
                _id: decoded,
            }});
    } catch (err) {
        console.error(err);
        console.log(token);
        res.status(401).json({ errorMessage: "Unauthorized" });
    }
}


export default { signin, signout, requireSignin, hasAuthorization, loggedIn } 