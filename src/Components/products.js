
import React, {useEffect, useState} from "react";
import { getProducts } from "../api";
import {Link, useNavigate} from 'react-router-dom';

const Products = ({products}) => {
    console.log(products)
    const navigate = useNavigate();
    // const [products, setProducts] = useState([])
    // const fetchProd = async () => {
    //     const results = await getProducts()

    //  setProducts(results)
    //  console.log(products)
    // }
    // useEffect(() =>{
    //     fetchProd()
    // }, [])
    if (!products) {
        return null
    }
    return(
        <div>
            {
                products.map((product) =>{
                    const { id, title, description, price} = product;

                    return(
                        <div key= {id}>
                            <h3>{title}</h3>
                            <p className="description"> Description: {description}</p>
                            <p>Price: {price}</p>
                            {/* {
                                add ternary operator for admin priveleges
                            } */}
                        </div>
                    )
                })
            }
        </div>
    )
}




export default Products;