import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from "../api";
import './CSS/products.css';
import {
    TextField,
    Paper,
    Button,
    Card,
    CardContent,
    Grid,
} from '@mui/material';

const Products = ({ products, navigate }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const paperStyle = {
        padding: 20,
        width: 350,
        margin: '1rem auto'
    }

    const productMatches = (product, string) => {
        const { title, description, id, price } = product;
        title.toLowerCase();

        if ((title.toLowerCase().includes(string)) || description.toLowerCase().includes(string)) {
            return product;
        }
    }

    const filteredProducts = products.filter(product => productMatches(product, searchTerm));

    const productsToDisplay = searchTerm.length ? filteredProducts : products;
    return (
        <div className='allProductsPresent'>
            <h1>Products</h1>
            <div className='searchProductsContainer'>
                <form
                    className='searchForm'
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                    <div className='returnedContentForm'>
                        <h3 className='searchBarHeader'>Search Products Here</h3>
                        <TextField
                            id="standard-basic"
                            label="(ex: title, description)"
                            variant="standard"
                            className='userSearchInput'
                            type='text'
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                </form>
            </div>
            <div className='allProducts'>
                {
                    products ? (
                        productsToDisplay.map((product) => {
                            const { title, description, id, price } = product;
                            return (
                                <div key={id} className='productBox'>
                                    <Grid
                                        container
                                        gap={'20rem'}
                                        direction='row'
                                        alignItems='flex-start'
                                        justifyContent='center'
                                        justify='flex-start'>
                                        <Paper elevation={10} style={paperStyle}>
                                            <Card>
                                                <CardContent>
                                                    <h3>{title}</h3>
                                                    <p>{price}</p>
                                                    <Link to={`/products/${id}`}>View</Link>
                                                </CardContent>
                                    </Card>
                                </Paper>
                            </Grid>
                        </div>
                                            )
                    })
                                            ) : (
                                            <p></p>
                                            )
            }
                                        </div>
                                </div>
                            )
                        }

export default Products;


// import React, {useEffect, useState} from "react";
// import { getProducts } from "../api";
// import {Link, useNavigate} from 'react-router-dom';

// const Products = ({products}) => {
//     console.log(products)
//     const navigate = useNavigate();
//     // const [products, setProducts] = useState([])
//     // const fetchProd = async () => {
//     //     const results = await getProducts()

//     //  setProducts(results)
//     //  console.log(products)
//     // }
//     // useEffect(() =>{
//     //     fetchProd()
//     // }, [])
//     if (!products) {
//         return null
//     }
//     return(
//         <div>
//             {
//                 products.map((product) =>{
//                     const { id, title, description, price} = product;

//                     return(
//                         <div key= {id}>
//                             <h3>{title}</h3>
//                             <p className="description"> Description: {description}</p>
//                             <p>Price: {price}</p>
//                             {/* {
//                                 add ternary operator for admin priveleges
//                             } */}
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }




// export default Products;