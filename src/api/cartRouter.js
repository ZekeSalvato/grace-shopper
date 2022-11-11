const express = require('express');
const {getCart, updateCart, removeFromCart} = require('../../db/cart')
const cartRouter = express.Router();

//require token on login?
cartRouter.get('/', async(req, res, next) => {
    const cart = await getCart();
  res.send(cart)
});

cartRouter.patch('/', async(req, res, next) =>{
    // const { productId, quantity} = req.body;
    try {
        const updatedCart = await updateCart({id, productId, quantity})
        res.send(updatedCart)
    } catch(error){
        console.log("failed to update cart")
        throw error
    }
})

cartRouter.delete('/', async(req, res, send) =>{
    if(!req.user) {
        res.send({error: "Not Authorized for user"});
    return;
    }
    try {
        const deletedProduct = await removeFromCart(productId);
        return deletedProduct;
    }catch(error){
        console.log("couldn't delete item")
        throw error
    }
})

module.exports = cartRouter;