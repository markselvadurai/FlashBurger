import mongoose from 'mongoose'


const ProductSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        trim: true
    },
 
    description:{
        type: String,
        required: true
    },

    category: {
        type:String,
        require:true
    },

    price: {
        type: Number,
        required: true
    },

    imgurl: {
        type: String,
        required: false
    }

}, {versionKey: false});

export default mongoose.model('Product', ProductSchema);