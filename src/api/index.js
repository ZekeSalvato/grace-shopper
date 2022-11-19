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