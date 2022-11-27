const { client } = require('./client');
const bcrypt = require('bcrypt');


async function createUser({username, password}) {
    try{
        const {rows: [user]} = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2) 
            ON CONFLICT  (username) DO NOTHING
            RETURNING id, username;
        `, [username, password]);

        return user;
    } catch(error){
        console.log("error creating user")
        throw error
    }
}

async function getUser({ username, password }) {

    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch) {
      try {
        const {
          rows: [user],
        } = await client.query(
          `
        SELECT id, username
        FROM users
        WHERE username=$2 AND password=$3;
        `,
          [username, hashedPassword]
        );
  
        return user;

      } catch (error) {
        throw error;
      }
    }
  }

  
  
  async function getUserById(userId) {
    
    try {
      const {
        rows: [user],
      } = await client.query(
        `
    SELECT id, username     
    FROM users
    WHERE id=${userId};
    `);

      return user;

    } catch (error) {
        throw error;
    }
  }

  async function fetchAllUsers(){
    console.log("fetch users")
    try {
      const {rows} = await client.query(`
        SELECT *
        FROM users;
      `)
        console.log("done with query")
      return rows;
    } catch(error){
      console.log(error)
      throw error
    }
  }
  
  
  async function getUserByUsername(username) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
        [username]
      );
  
      return user;
    } catch (error) {
        throw error;
    }
  }
  
  module.exports = {
    createUser,
    getUser,
    getUserById,
    fetchAllUsers,
    getUserByUsername
  }