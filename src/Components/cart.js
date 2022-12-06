import React from "react";
import {getCart} from '../api/'
import './CSS/Cart.css';

const Cart =  ({token}) => {
    const handleSubmit = async () =>{
         const cart =  await getCart()
    }
   console.log(getCart(token))
    return(
        <div id="cartCard">
            <h2>🛍  Shopping Cart</h2>
            
        </div>
    )
}

export default Cart;