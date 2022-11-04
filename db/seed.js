const { client } = require('./')

const { createProduct } = require('./products')

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
  catch(ex) {
    console.log('error dropping tables')
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
        price INTEGER NOT NULL
      );
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false;
        
      );
      CREATE TABLE category (
        id SERIAL PRIMARY KEY,

      )

    `)
    
    console.log('Finished Creating Tables')
  } 
  catch(ex) {
    console.log('error creating tables')
  }
}

async function createInitialProducts() {
  try {
    console.log('Creating Products')
    await createProduct({
      title:
        "The first most amazing product",
      description:
        "Description for the first most amazing product ever...."
    });
    
    await createProduct({
      title:
        "The second most amazing product",
      description:
        "Description for the second most amazing product ever...."
    });
    
    await createProduct({
      title:
        "The third most amazing product",
      description:
        "Description for the third most amazing product ever...."
    });
    
    console.log('Finished creating Products')
  } 
  catch(ex) {
    console.log('error creating Products')
  }
}

async function createInitialUsers() {
  console.log("Creating users")
  try{
    const adminList = [
      {username: "Alphonse", password: "password", isAdmin: true}
    ]
    const admins = await Promise.all(adminList.map(createUser))
  } catch(error){
    console.log("Failed to make admin")
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
  catch(ex) {
    console.log('Error building the DB')
  }
}


buildDB()
  .catch(console.error)
  .finally(() => client.end())

  //test