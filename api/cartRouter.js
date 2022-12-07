const express = require('express');
const {getCart, updateCart, removeFromCart, addToCart} = require('../db/cart');
const cartRouter = express.Router();

//require token on login?
cartRouter.get('/', async(req, res)=> {
    try{
        const carts = await getCart(req.user.id)
        res.send(carts);
    } catch(error) {
        throw error;
    }
});

cartRouter.post('/', async (req, res, next) =>{
    const {productId, quantity} = req.body;

    try {
        const addedToCart = await addToCart(productId, quantity)
        res.send(addedToCart)
    } catch(error){
        console.log("Failed to add to cart")
        throw error;
    }
})

cartRouter.patch('/', async(req, res, next) =>{
    const { id, quantity} = req.body;
    try {
        const updatedCart = await updateCart(id, quantity)
        res.send(updatedCart)
    } catch(error){
        console.log("failed to update cart")
        throw error
    }
})

cartRouter.delete('/', async(req, res, send) =>{
    // if(!req.user) {
    //     res.send({error: "Not Authorized for user"});
    // return;
    // }
    try {
        const {id} = req.body;
        const deletedProduct = await removeFromCart(id);
        return deletedProduct;
    }catch(error){
        console.log("couldn't delete item")
        throw error
    }
})

module.exports = cartRouter;