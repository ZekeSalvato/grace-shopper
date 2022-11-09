const { client } = require('./client');

async function createProduct({title, description, price}) {
  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO products (title, description, price)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [title, description, price])
    
    return product;
  }
  catch(error) {
    console.log('error in createProduct adapter function')
    throw error
  }
}

async function fetchAllProducts(){
  console.log("fetch products")
  try {
    
    const {rows} = await client.query(`
      SELECT *
      FROM products;
    `)
      console.log("done with query")
    return rows;
  } catch(error){
    console.log(error)
    throw error
  }
}



async function updateProduct({id, ...fields}) {
  const setString = Object.keys(fields).map(

    (key, index) => {
      return `"${key}" =$${index +1} `
    });

    try {
      const {rows: [products]} = await client.query(`
        UPDATE products
        SET ${setString}
        WHERE id= ${id}
        RETURNING *;
      `, Object.values(fields));

      return products;
    } catch(error){
        console.log("could not update product")
        throw error
    }
}

async function deleteProduct(id) {
  try{
    const {rows: [products]} = await client.query(`
      DELETE FROM products
      WHERE id= $1
    `, [id]);

    return products;
  } catch(error) {
    console.log("Error deleting product")
    throw error
  }
}

async function getProductById(id){
  try{
    const{rows: [product] } = await client.query(
        `
        SELECT * FROM products
        WHERE id=$1;
        `, [id]
    )
    return product;
  }catch(error){
    throw error;
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts,
  getProductById
}
