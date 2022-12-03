import { React, useState } from 'react';
import { logInUser } from '../api';
import { useNavigate, Link  } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import "./CSS/Login.css";


const Login = (props) => {
    const { setToken } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log('Login User', logInUser())
        const results = await logInUser(username, password);
        console.log('results', results)
        if (results.success) {
            setToken(results.data.token);
            window.localStorage.setItem('token', results.data.token);
            navigate('/profile');
        } else {
            console.log(results.error.message)
        }
    }
    return (
        <div id="loginForm">
      <h1 id="loginHead">LOGIN</h1>
      <form>
        <input
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" onClick={(event) => {
          event.preventDefault
          handleSubmit()
        }
        
        }>Submit</button>
      </form>
      
      <Link id='signUp'  to={"/register"}>Sign Up</Link>
    </div>
    )
}

export default Login;