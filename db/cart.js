const {client} = require("./client");


async function getCart(id){
    try{
        const{ rows: cart } = await client.query(
            `
            SELECT * 
            FROM cart
            JOIN products ON cart."productId" = products.id
            WHERE cart."userId" = $1;
            `, [id]
        )
        return cart;
    }catch(error){
        throw error;
    }
}


async function addToCart(productId, quantity, userId){
    try{
        const{rows: [addProductToCart]} = await client.query(
            `
            INSERT INTO cart("productId", quantity, "userId")
            VALUES ($1,$2, $3)
            RETURNING *;
            `, [productId, quantity, userId]
        );
        return addProductToCart;
    }catch(error){
        throw error;
    }
}



async function removeFromCart(id){
    try{
        const{
            rows: result
        } = await client.query(
            `
            DELETE FROM cart WHERE id = $1;

            `, [id]
        );
        return result;
    }catch(error){
        throw error;
    }
}

async function updateCart(id, quantity){
    try{
        const{rows: [updatedCart]} = await client.query(
            `
            UPDATE cart SET quantity= $2
            WHERE id=$1
            `,[id, quantity]
        );
        return updatedCart;
    }catch(error){
        throw error;
    }
}




module.exports = {
getCart,
addToCart,
removeFromCart,
updateCart
}