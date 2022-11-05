const { client } = require('./client')

const { createProduct, fetchAllProducts } = require('./products')
const { createUser } = require('./users')

async function dropTables() {
  try {
    console.log('Dropping Tables')
    // add code here
    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `)
    
    console.log('Finished Dropping Tables')
  } 
  catch(error) {
    console.log('error dropping tables')
    throw error
  }
}

async function createTables() {
  try {
    console.log('Creating Tables')
    // add code here
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description VARCHAR(255),
        price VARCHAR(225)
      );
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
        
      );

    `)
    
    console.log('Finished Creating Tables')
  } 
  catch(error) {
    console.log('error creating tables')
    throw error
  }
}

async function createInitialProducts() {
  try {
    console.log('Creating Products')
    await createProduct({
      title:
        "Headphones",
        price: "$200",
      description:
        "Seriously, who pays $200 for headphones...."
    });
    
    await createProduct({
      title:
        "Teats on a hog",
        price: "priceless",
      description:
        "Whats that saying about teats on a hog....?"
    });
    
    await createProduct({
      title:
        "Computer",
        price: "10",
      description:
        "Surely not a scam...."
    });
    const products = await fetchAllProducts();
    console.log(products)
    console.log('Finished creating Products')
  } 
  catch(error) {
    console.log('error creating Products')
    throw error
  }
}

async function createInitialUsers() {
  console.log("Creating users")
  try{
    const adminList = [
      {username: "Alphonse", password: "password", isAdmin: true},
      {username: "Zeke", password: "password", isAdmin: true},
      {username: "Stephanie", password: "password", isAdmin: true}
    ]
    const admins = await Promise.all(adminList.map(async (user) => {
      const result = await createUser(user)
      console.log(result)
      return result;
    }))
  } catch(error){
    console.log("Failed to make admin")
    throw error
  }
}
async function buildDB() {
  try {
    // need to add something here
    client.connect();
    await dropTables();
    await createTables();
    await createInitialProducts();
    await createInitialUsers();
  }
  catch(error) {
    console.log('Error building the DB')
    throw error
  }
}


buildDB()
  .catch(console.error)
  .finally(() => client.end())

  //test