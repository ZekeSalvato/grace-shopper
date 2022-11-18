
import React, {useEffect, useState} from "react";
// import { Products } from ".";

async function getProducts(){
    try{
        const response = await fetch(`localhost://3001/api/products`)
        const results = await response.json();
        return results
    } catch(error){
        console.log("test")
        throw error
    }
}
const Products = () => {
    const [products, setProducts] = useState([])
    const fetchProd = async () => {
        const results = await getProducts()

     setProducts(results)
     console.log(products)
    }
    useEffect(() =>{
        fetchProd()
    }, [])
    return(
        <div>Hellow World</div>
    )
}

export default Products;