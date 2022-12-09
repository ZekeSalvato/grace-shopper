import { token } from "morgan";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCart, addToCart, removeFromCart, updateCart } from '../api';
import './CSS/Cart.css';







//delete items

const Cart = ({ token }) => {
    const [cart, setCart] = useState([]);
    const fetchCartItems = async () => {
        setCart(await getCart(token))
    }
    useEffect(
        () => {
            fetchCartItems();
        }, []
    )
    console.log('cart', cart)

    return (
        <div id="cartCard">
            <h2>🛍  Shopping Cart</h2>
            <div className="row">
                {
                    cart.map((item)=>{
                        const { image, title, price, quantity} = item
                        return (
                            <div><p> Title: {title}</p>
                            <p> Quantity: {quantity} </p>
                            <p> Price: {price} </p>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}






export default Cart;