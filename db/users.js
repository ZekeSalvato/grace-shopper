const { client } = require('./client');
const bcrypt = require('bcrypt');


async function createUser({username, password}) {
  const hashedPassword = await bcrypt.hash(password, 5)
    try{
        const {rows: [user]} = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2) 
            ON CONFLICT  (username) DO NOTHING
            RETURNING id, username, password;
        `, [username, hashedPassword]);

        return user;
    } catch(error){
        console.log("error creating user")
        throw error
    }
}

async function getUser({ username, password }) {

    console.log("in login db", username, password)
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;
    console.log(hashedPassword)
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    console.log(passwordsMatch)
    
    if (passwordsMatch) {
      try {
        const {
          rows: [user],
        } = await client.query(
          `
        SELECT id, username
        FROM users
        WHERE username=$1 AND password=$2;
        `,
          [username, hashedPassword]
        );
        console.log("result", user)
  
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

  async function checkIfUserExists(username) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT username
        FROM users
        WHERE username=$1;
        
      `,
        [username]
      );
  
      return user;
    } catch (error) {
      console.error('Error checking if user exists');
      throw error;
    }
  }
  
  
  async function getUserByUsername(userName) {
    console.log("in get user by username function")
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT *
        FROM users
        WHERE username=$1;
      `,
        [userName]
      );
    console.log(user)
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
    checkIfUserExists,
    getUserByUsername
  }