// import { getCart } from "../../db";

const baseURL = 'http://localhost:3000/api'

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${baseURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username: username,
                    password: password
            })
        })

        const results = await response.json();

        console.log(results)
 
        return results;
    } catch (err) {
        console.log('Error registering user')
    }
};

export const logInUser=async (username, password)=>{
    try{
        const response= await fetch(`${baseURL}/users/login`,{
        method: "POST",
        headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username,
        password 
      }
    })
  })
     const result= await response.json();
     return result;
     
    } catch(ex){
      console.log('error logging in user')
    }
  }

 export const getProducts = async () =>{
    console.log("in getProd")
//    try{
//         const response = await fetch(`localhost://3001/products`, {
            
//                 headers: {
//                   'Content-Type': 'application/json',
//                 }
              
//         })
//         console.log("response34", response)
//         const results = await response.json();
//         return results
//     } catch(error){ 
//         console.log("test")
//         throw error
//     }
}

// export const addToProducts

export const getCart = async (token) =>{
  try{
    const response = await fetch(`${baseURL}/cart`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    
  })
  const results = await response.json()
  return results
  } catch(error){

    throw error
  }
}

export const addToCart = async (productId, quantity, token) =>{
  try{
    const response = await fetch(`${baseURL}/cart`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
              quantity, productId
      })
  })
  const results = await response.json()
  return results
  } catch(error){

    throw error
  }
}

export const removeFromCart = async (id) =>{
  try{
    const response = await fetch(`${baseURL}/cart`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id})
  })
  const results = await response.json()
  return results

  } catch(error) {

    throw error
  }
}

export const updateCart = async (id, quantity) =>{
  try{
    const response = await fetch(`${baseURL}/cart`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({id, quantity})
  })
  const results = await response.json()
  return results
  }catch(error){

    throw error
  }
}