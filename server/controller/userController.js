import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from './../../config/config.js'
import Cart from '../model/cartModel.js'

//create a new user
const create = async(req,res) => {
    const user = new User(req.body);
    console.log(req.body);
    try{
        await user.save();
        const token = jwt.sign({_id : user._id}, config.jwtSecret);
        res.cookie('t', token, {expire: new Date() + 9999, httpOnly: true, secure: process.env.NODE_ENV === 'production'});
        //create a cart and link it to this user
        const newCart = await Cart.create({owner: user.id});
        return res.status(200).json({
            message: 'Successfully signed up',
            token,
            user:{
                _id : user._id,
                username: user.username,
                email: user.email
            }
        });
    }catch (err){
        return res.status(400).json({
            error: 'Error occured: ' + err
            
        });
        
    }
}

//lists all the users in a list format
const list = async(req,res) => {
    try{
        let users = await User.find().select('username  email  country city postalCode address created updated'); // display in this format in JSON
        res.json(users);
    }catch(err){
        return res.status(400).json({
            error: 'An error occured retrieving a list of users: ' + err
        });
    }
}
//get user by id
const userById = async(req,res,next) => {
    const {id} = req.params; // get the id from the req.parameters and store in id
    try{
        const foundUser = await User.findById({_id : id});
        if(!foundUser){
            res.status(400).json({error : 'User not found'});
        }
        req.profile = foundUser
        next();
    }catch(err){
        return res.status(400).json({
            error: 'Error retrieving user by id: ' + err
        });
    }
}
//read single user
const read = async (req,res) =>{
    //do not display hashed_password and salt
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}


//update the user
const update = async(req,res,) => {
    console.log('Update Running');
    console.log(req.body);
    const {id} = req.params;
    try{
        const foundUser = await User.findById(id);
        if(!foundUser){
            return res.status(400).json({
                message: 'Error updating user: '
            });
        }
        else{
            if (req.body.username) foundUser.username = req.body.username;
            if (req.body.email) foundUser.email = req.body.email;
            if (req.body.password) foundUser.password = req.body.password;
            if (req.body.country) foundUser.country = req.body.country;
            if (req.body.city) foundUser.city = req.body.city;
            if (req.body.postalCode) foundUser.postalCode = req.body.postalCode;
            if (req.body.address) foundUser.address = req.body.address;
            console.log(foundUser);
            foundUser.updated = Date.now();
            await foundUser.save();
            return res.status(200).json({
                message: 'User updated successfully'
            });
        }
    }catch(err){
        res.status(400).json({
            message: 'update catch err:',
            error: 'Error :' + err
        });
    }
}

//delete a single user
const deleteUser = async(req,res) =>{
    const {id} = req.params;
    console.log(req.profile);
    try{
        const deleteUser = await User.findOneAndDelete({_id: id});
        //delete cart aswell
        await Cart.findOneAndDelete({owner: deleteUser._id});
        res.status(200).json({
            message: 'User with id: ' + id + ' deleted'
        });
    }catch(err){
        res.status(400).json({
            error: 'Error: ' + err
        });
    }
}

//administrator purposes only, delete all users
const deleteAllUsers = async(req,res) =>{
    try{
        await User.deleteMany();
        return res.status(200).json({
            message: 'Successfully deleted all users'
        });
    }catch(err){
        return res.status(400).json({
            error: 'There are no users to delete'
        })
    }
}

export default {userById, list, create, update, deleteUser, deleteAllUsers, read}