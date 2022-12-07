import React from 'react';

const Profile = ({ user }) => {
  const userID = user.id;
  
  console.log(user)
  
  return (
    //previously viewed, order history, Profile title, reviews
    <div id="profileForm">
      <h1 id='profileHead'>Profile</h1>
      <h2>Previously Viewed</h2>
      <h2>Order History</h2>
      <h2>Reviews</h2>
    </div>
  )
}

export default Profile;