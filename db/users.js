const { client } = require('./');

async function createUser({username, password}) {
    try{
        const {rows: [user]} = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2) 
            ON CONFLCIT  (username) DO NOTHING
            RETURNING id, username;
        `, [username, password]);

        return user;
    } catch(error){
        console.log("error creating user")
        throw error
    }
}

async function setAsAdmin({username, isAdmin}){
try{
    const {rows: admin}= await client.query(`
    SELECT username
    FROM users
    username = $1 AND "isAdmin" = TRUE
`)
} catch(error){
    console.log("error setting admin")
    throw error
}
}
module.exports = {
    createUser
}