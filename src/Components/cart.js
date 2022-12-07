import React, {useState, useEffect} from "react";
import {getCart, addToCart, removeFromCart, updateCart} from '../api'
import './CSS/Cart.css';

const Cart =  ({token}) => {
    
//     const handleSubmit = async () =>{
//          const cart =  await getCart()

//          //call to api for getcart, include useeffect
//          //cart is basically condensed react app
//          //getcart and assign a state and effect
//     }
//    console.log(getCart(token))


    return(
        <div id="cartCard">
            <h2>🛍  Shopping Cart</h2>
            
        </div>
    )
}

// async function addItem () {
//     const results = await addToCart(token)
//     getCart()

//    }



export default Cart;