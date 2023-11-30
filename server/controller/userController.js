import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from './../../config/config.js'

//create a new user
const create = async(req,res) => {
    const user = new User(req.body);
    console.log(req.body);
    try{
        await user.save();
        const token = jwt.sign({_id : user._id}, config.jwtSecret);
        res.cookie('t', token, {expire: new Date() + 9999, httpOnly: true, secure: process.env.NODE_ENV === 'production'});
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
    const {id} = req.params;
    try{
        const foundUser = await User.findById(id);
        if(!foundUser){
            return res.status(400).json({
                message: 'Error updating user: '
            });
        }
        else{
            foundUser.username = req.body.username;
            foundUser.email = req.body.email;
            foundUser.password = req.body.password;
            foundUser.updated = Date.now();
            foundUser.country = req.body.country;
            foundUser.city = req.body.city;
            foundUser.postalCode = req.body.postalCode;
            foundUser.address = req.body.address;
            await foundUser.save();
            return res.status(200).json({
                message: 'User updated successfully'
            });
        }
    }catch(err){
        res.status(400).json({
            error: 'Error :' + err
        });
    }
}

//delete a single user
const deleteUser = (req,res) =>{
    const {id} = req.params;
    console.log(User);
    try{
        User.deleteOne({_id : id});
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