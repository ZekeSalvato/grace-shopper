const { client } = require('./');

async function createProduct({title, description, price}) {
  try {
    const { rows: [product]} = await client.query(`
      INSERT INTO products (title, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [title, description, price])
    
    return product;
  }
  catch(ex) {
    console.log('error in creatPruduct adapter function')
  }
}

async function fetchAllProducts({id, ...fields}){
  try {
    const {rows: products} = await client.query(`
      SELECT *
      FROM products
    `, [fields])

    return products;
  } catch(error){
    console.log("failed to fetch products")
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

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts
}
