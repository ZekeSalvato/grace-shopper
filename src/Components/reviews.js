import { Button, TextField, Paper } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Reviews = ({ reviews }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    function reviewMatch(review, string) {
        const{user, rating} = review;
        
        if (user.toLowerCase().includes(string.toLowerCase())) {
            return review;
        }
    }
    
    const filteredReviews = reviews.filter(review => reviewMatch(review, searchTerm));
    const reviewsToDisplay = searchTerm.length ? filteredReviews : reviews;
    
    return (
        <div>
            <div>
        <form onSubmit={(event) => {
            event.preventDefault();
        }}>
        </form>
            </div>
        <Button>
            <Link to='/reviews/createReview'>Add A Review</Link>
        </Button>
       {
           reviewsToDisplay.map((review) => {
               const {user, rating} = review;
               return (
               <div key={_id}>
                <p>User: {user}</p>
                <p>Rating: {rating}</p>
               </div>
                )
            })
        }
        </div>
    )
}

export default Reviews;