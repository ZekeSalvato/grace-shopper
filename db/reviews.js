const { client } = require ('./client')

async function createReview({userId, rating}) {
    try {
        const {rows: [review]} = await client.query(`
        INSERT INTO reviews ('userId', rating)
        VALUES ($1, $2) 
        RETURNING *;
        `, [userId, rating]);
    return reviews;
    }
    catch(error) {
        console.log('error creating review')
        throw error
    } 
}

async function fetchAllReviews() {
    console.log('fetch reviews')
    try {
        const {rows} = await client.query (`
        SELECT *
        FROM reviews;
        `)

        return rows;
    }   catch(error) {
        console.log(error)
        throw error
    }
}

async function updateReview({id, ...fields}) {
    const setString = Object.keys(fields).map(
        (key, index) => {
            return `"${key}" =$${index +1} `
        }
    );

    try {
        const {rows: [reviews]} = await client.query(`
        UPDATE reviews
        SET ${setString}
        WHERE id= ${id}
        RETURNING *;
        `, Object.values(fields));
        return reviews;
    }   catch(error){
        console.log("could not update reviews")
        throw error
    }   
}

async function deleteReview(id) {
    try{
        const {rows: [reviews]} = await client.query(`
        DELETE FROM reviews
        WHERE id= $1
        `, [id]);
        return reviews;
    }   catch(error) {
        console.log("Error deleting review")
        throw error
    }  
}

async function getReviewById(id){
    try{
        const{rows: [review]} = await client.query(`
        SELECT * FROM reviews
        WHERE id= $1;
        `, [id]
        )
        return review;
    }   catch(error){
        throw error;
    }
}

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    fetchAllReviews,
    getReviewById
}