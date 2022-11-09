const client = require("./client");
const { getProductById } = require ("./products");

async function getCart(id){
    try{
        const{ rows: [product] } = await client.query(
            `
            SELECT * 
            FROM products
            WHERE id=$1
            `, [id]
        )
        return product;
    }catch(error){
        throw error;
    }
}

async function createCart(){

}

async function addToCart(){
    

}

async function removeFromCart(){

}





module.exports = {
getCart,
createCart,
addToCart,
removeFromCart
}