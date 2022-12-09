import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from "../api";
import './CSS/productView.css';
import { addToCart, removeFromCart } from '../api';
import { Card } from "@mui/material";

function ProductView({ products, user, fetchAllCartItems, navigate, token, fetchAllProducts }) {
    const { productId } = useParams();

    if (products.length) {
        const [currentProduct] = products.filter(product => product.id == productId);
        const { title, description, image, price } = currentProduct;
        const { isAdmin, id } = user;

        return (
            <div className='productViewDiv'>
                <Card id='productViewCard'>
                <div>

                    <h3>{title}</h3>
                    <p className="description">Description: {description}</p>
                    <p>Price: {price}</p>
                    <button id="AddMe" onClick={async (event) => { addToCart(productId, 1, token); } }>Add to Cart</button>
                    <Link to='/products'>Back</Link>
                </div>
                {isAdmin ? (
                    <Link to={`/products/edit/${productId}`}>Edit Product</Link>
                ) : (
                    <p></p>
                )}
            </Card>
            </div>
        );
    } else {
        <h1>Waiting for product..</h1>;
    }
}

export default ProductView;