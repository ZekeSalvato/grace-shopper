import { token } from "morgan";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCart, addToCart, removeFromCart, updateCart } from '../api';
import './CSS/Cart.css';

//add items to cart

// const addItems = () => {
//     const addBtn = document.querySelectorAll("#AddMe");
//     addBtn.forEach(function(btn){
//         btn.addEventListener('click', function(event){
//             console.log(event.target)
//         })
//     })
// } 
// addItems();



//delete items

const Cart = ({ token }) => {
    

   

    //     const handleSubmit = async () =>{
    //          const cart =  await getCart()

    //          //call to api for getcart, include useeffect
    //          //cart is basically condensed react app
    //          //getcart and assign a state and effect
    //     }
    //    console.log(getCart(token))

    // let deleteBtn = document.getElementById("#delete")

    // for (let i = 0; i < deleteBtn.length; i++) {
    //     let btn = deleteBtn[i]
    //     btn.addEventListener('click', removeItem)
    // }

    // function removeItem(event) {
    //     let btnClick = event.target
    //     btnClick.parentElement.parentElement.remove()
    // }

    // let addBtn = document.getElementById("#AddMe")

    // for (let i=0; i< addBtn.length; i++) {
    //     let btn = addBtn[i]
    //     btn.addEventListener('click', function(event){
    //         let btnClick= event.target
    //         btnClick.parentElement.parentElement
    //     })
    // }


    return (
        <div id="cartCard">
            <h2>🛍  Shopping Cart</h2>
            <div className="row">
                <span className="item header column">ITEM </span>
                <span className="price header column">PRICE </span>
                <span className="quantity header column">QUANTITY</span>
            </div>
            {/* <div className="cart-item">
                <div className="row">
                    <div className="cart-item column">
                        <h3> shirt</h3>
                    </div>
                    <div className="quantity column">
                        <input className="amt" type='number' value='1'></input>
                        <button id="delete">Delete</button>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

// async function addItem () {
//     const results = await addToCart(token)
//     getCart()

//    }



export default Cart;