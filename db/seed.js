const { client } = require('./client')

const { createProduct, fetchAllProducts } = require('./products')
const { createUser } = require('./users')

async function dropTables() {
  try {
    console.log('Dropping Tables')
    // add code here
    await client.query(`
      DROP TABLE IF EXISTS cart;
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
        price INTEGER
      );
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(225) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
        
      );

      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        rating INTEGER NOT NULL,
        CHECK(rating <= 10)
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
        "Tamagotchi",
        price: "25",
      description:
        "Bring back ALL the 90s memories with the infamous pocket friend"
    });
    
    await createProduct({
      title:
        "Etch A Sketch",
        price: "15",
      description:
        "Draw the world around you, your friends, or your favorite TV characters with Etch A Sketch "
    });
    
    await createProduct({
      title:
        "Bop It",
        price: "20",
      description:
        "The Bop It! game is a portable game for on-the-go fun. It features 3 solo and social play options and others for one or more players"
    });

    await createProduct({
      title:
        "Furby",
        price: "45",
      description:
        "The 90s favorite furry electronic companion with a vocabulary of about 200 words and ability to react to its environment"
    });

    await createProduct({
      title:
        "Beanie Babies",
        price: "100",
      description:
        "Collect and cuddle with the 90s most sought after collectible item"
    });

    await createProduct({
      title:
        "Sony Aibo",
        price: "60",
      description:
        "Aibo, the robotic K9 companion with tricks up his sleeve"
    });

    await createProduct({
      title:
        "Super Nintendo (SNES)",
        price: "120",
      description:
        "Famous 16-bit console released by Nintendo"
    });

    await createProduct({
      title:
        "K'Nex",
        price: "30",
      description:
        "K'Nex is a rod and connector building system that lets you build kinetic toys"
    });

    await createProduct({
      title:
        "Socker Boppers",
        price: "25",
      description:
        "Inflatable boxing pillows for soft and safe fun!"
    });

    await createProduct({
      title:
        "Creepy Crawlers",
        price: "20",
      description:
        "Spooky die-cast bug molds available in assorted colors"
    });

    await createProduct({
      title:
        "Tech Deck",
        price: "10",
      description:
        "Finger sized skateboards perfect for shredding the gnar on the kitchen counter top"
    });

    await createProduct({
      title:
        "Rock Em Sock Em",
        price: "60",
      description:
        "Battle your friends in the arena with the Rock em Sock em robot boxing ring"
    });

    await createProduct({
      title:
        "Jenga",
        price: "0",
      description:
        "Stack against your friends but don't knock over the tower!"
    });

    await createProduct({
      title:
        "Mighty Beanz",
        price: "50",
      description:
        "Collectible battle beans"
    });

    await createProduct({
      title:
        "Lite Brite",
        price: "60",
      description:
        "Create art with light using Lite-Brite"
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
      {username: "Stephanie", password: "password", isAdmin: true},
      {username: "Scout", password: "password", isAdmin: true},
      { username: "Lexi", password: "password", isAdmin: true}
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