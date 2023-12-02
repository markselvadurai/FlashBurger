import Product from '../model/productModel.js'

const listProducts = async(req,res) => {
    try{
        let products = await Product.find().select('name description category price');
        return res.status(200).json({
            products
        });
    }catch(err){
        return res.status(400).json({
            error: 'Error occurred: ' + err
        });
    }
}

const productById = async(req,res, next)=>{
    const {id} = req.params;
    try{
        const foundProduct = await Product.findById({_id : id});
        req.profile = foundProduct;
        next();
    }catch(err){
        return res.status(400).json({
            error: 'Error occured: ' + err
        });
    }
    
}

const readProduct = (req, res) => {
    return res.json(req.profile);
}

const createProduct = async(req,res) => {
    const product = new Product(req.body);
    try{
        await product.save();
        return res.status(200).json({
            message: 'Product added to catalog'
        });
    }catch (err){
        return res.status(400).json({
            error: 'Error occured: ' + err
        });
    }
}

const updateProduct = async(req,res) => {
    const {id} = req.params;
    try{
        //find the product
        const foundProduct = await Product.findById(id);
        if(!foundProduct){
            return res.status(400).json({
                eror: 'Product with that id not found'
            });
        }else{
            foundProduct.name = req.body.name;
            foundProduct.description = req.body.description;
            foundProduct.category = req.body.category;
            foundProduct.price = req.body.price;
            await foundProduct.save();
            return res.status(200).json({
                message: 'Product successfully updated'
            });
        }
    }catch (err){
        return res.status(400).json({
            error: 'Error updating product: ' + err
        });
    }
}

const deleteProduct = async(req,res)=>{
    const {id} = req.params.id;
    try{
        Product.deleteOne({_id : id});
        res.status(200).json({
            message: 'Product successfully deleted'
        });
    }catch(err) {
        return res.status(400).json({
            error: 'Error deleting product: ' + err
        });
    }
}

const deleteAllProducts = async(req,res)=>{
    try{
        await Product.deleteMany();
        return res.status(200).json({
            message: 'Successfully deleted all products'
        });
    }catch(err) {
        return res.status(400).json({
            error: 'Error occurred: ' + err
        });
    }
}

export default {deleteAllProducts, deleteProduct, productById, readProduct, listProducts, updateProduct, createProduct}
