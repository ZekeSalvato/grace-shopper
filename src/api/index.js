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
    try{
        const response = await fetch(`localhost://3001/api/products`)
        const results = await response.json();
        return results
    } catch(error){
        console.log("test")
        throw error
    }
}
