import mongoose from 'mongoose'
const ObjectID = mongoose.Schema.Types.ObjectId
//create cart schema using userid as ref
const CartSchema = new mongoose.Schema({
    owner: {
        type: ObjectID,
        required: true,
        ref: 'User' // referencing the user schema
    },

    //array to hold products the user puts into cart
    items: [{
        itemId: {
            type: ObjectID,
            ref: 'Product',
            required: true
        },

        name: String, // name of product
        quantity: { 
        type: Number,
        required: true,
        min: 1,
        default: 1},
        price: Number
    }],

    //total amount for cart, set to a default value of 0 for no items
    total: {
        type: Number,
        required: true,
        default: 0
    }
}, {versionKey:false});

export default mongoose.model('Cart', CartSchema);