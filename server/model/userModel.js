import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: 'Username already exists'
    },
    email: {
        type: String,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        required: 'Email is required'
    },
    hashed_password: {
        type: String,
        required: 'Password is required',
    },
    created:{
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date,
        default: Date.now
    },
    //optional fields
    country: String,
    city: String,
    postalCode: String,
    address: String,
    //salt will be created during the .set method for the virtual field 'password'
    salt: String   
},   {versionKey:false});

//Bcrypt is 

//handling the password as a virtual field that will not be stored in the db
UserSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        /// using bcrypt to create salt instead of makeSalt method.
        this.salt = bcrypt.genSaltSync(10); // 10 is the saltRounds
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

//validate the hashed password to ensure it meets requirements
UserSchema.path('hashed_password').validate(function (v) {
    return new Promise((resolve, reject) => {
        if (!this._password || this._password.length < 6) {
            reject(new Error('Password must be at least 6 characters.'));
        } else {
            resolve();
        }
    });
}, null);

//list of methods that UserSchema has access to.
UserSchema.methods = {
    //a function to verify during sign in
    authenticate: function(plainTextPassword) {
        //comparing passwords with compareSync method, plaintext password is passed and compared with the hashed_password
        return bcrypt.compareSync(plainTextPassword, this.hashed_password);
    },
    // used to encrypt password before storing the hash
    encryptPassword: function(password) {
        //using bcrypt instead of crypto
        return bcrypt.hashSync(password, this.salt);
    }
};

 
export default mongoose.model('User', UserSchema);


