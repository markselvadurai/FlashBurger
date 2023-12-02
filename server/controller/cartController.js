import Cart from '../model/cartModel.js'
import Product from '../model/productModel.js'

const readCart = async(req, res) => {
    try{
        //list all items in cart
        let items = await Cart.find().select('owner items total');
        res.json(items);
    }catch(err) {
        return res.status(400).json({
            error: 'Error occured fetching cart data : ' + err
        });
    }
}

const addToCart = async (req, res) => {
    try {
        // get id and quantity from the req body
        const { id, quantity } = req.body;

        // look for the product with the id found
        const product = await Product.findById({ _id: id });
        console.log(product);
        if (!product) {
            return res.status(400).json({
                error: 'Product not found'
            });
        }

        // look for cart linked with user else, create an empty one
        let cart = await Cart.findOne({ owner: req.auth._id });
        

        // check to see if the item is in the cart already, if so increment quantity
        const cartCheck = cart.items.findIndex((item) => item.itemId.equals(product.id));
        if (cartCheck !== -1) {
            cart.items[cartCheck].quantity += quantity;
        } else {
            // product not in cart so just push it in
            cart.items.push({
                itemId: product.id,
                name: product.name,
                quantity,
                price: product.price
            });
        }

        // update total amount
        cart.total = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        // save changes
        await cart.save();
        return res.status(200).json({
            message: 'Product added into cart'
        });

    } catch (err) {
        return res.status(400).json({
            error: 'Error occurred when adding product into cart: ' + err
        });
    }
}

const removeItem = async (req, res) => {
    //get id for product to remove
    const {itemId} = req.body;
    const {id} = req.params;
    
    try{
        //find cart owner
        let cart = await Cart.findOne({ owner: req.auth._id });

        //find the index of the item in the cart
        const productToRemoveIndex = cart.items.findIndex(item => item.itemId.equals(itemId));
        //find the information of the item
        const productToRemove = cart.items.find(item => item.itemId.equals(itemId));
        
        if(productToRemoveIndex !== -1){
            //remove the product from the cart
            cart.items.splice(productToRemoveIndex, 1);
            console.log(productToRemove.quantity);
            console.log(productToRemove.price);
            //update total for cart
            cart.total -= productToRemove.quantity * productToRemove.price;
            
            //save the changes
            await cart.save();
            return res.status(200).json({
                message: 'Product removed from cart'
            });

        }else{
            return res.status(400).json({
                error: 'Product not in this cart'
            });
        }
        
    }catch(err) {
        return res.status(400).json({
            error: 'Unexpected error when removing item from cart: ' + err
        });
    }
}

export default { addToCart, removeItem, readCart}