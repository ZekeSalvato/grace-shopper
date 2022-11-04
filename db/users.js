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


module.exports = {
    createUser
}