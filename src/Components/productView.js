import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from "../api";
import { addToCart } from '../api';

const ProductView = ({ products, user, navigate }) => {
    const { productId } = useParams();

    if (products.length) {
        const [currentProduct] = products.filter(product => product.id == productId);
        const { title, description, price } = currentProduct;
        const { isAdmin, id } = user;
        
        return (
        <div className = 'productViewDiv'>
            <div>
             
                <h3>{title}</h3>
                <p className="description">Description: {description}</p>
                <p>Price: {price}</p>
                <button onClick = { async (event) => { addToCart()}}>Add to Cart</button>
                <Link to='/products'>Back</Link>
            </div>
            {
                isAdmin ? (
                    <Link to={`/products/edit/${productId}`}>Edit Product</Link>
                ) : (
                    <p></p>
                )
            }
        </div>
    )
    } else {
        <h1>Waiting for product..</h1>
    }
}

export default ProductView;