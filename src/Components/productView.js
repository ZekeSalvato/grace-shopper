import React from 'react';
import { Link } from 'react-router-dom';

const ProductView = () => {
    return (
        <div>
            <div>
                <h3>{title}</h3>
                <p className="description">Description: {description}</p>
                <p>Price: {price}</p>
            </div>
            {/* need to include a buy/add to cart button that adds productId to cart */}
        </div>
    )
}

export default ProductView;