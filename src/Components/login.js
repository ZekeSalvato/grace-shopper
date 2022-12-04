import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import "./CSS/Login.css";


const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const results = await loginUser(username, password);
        console.log(results)
        if (results.token) {
            setToken(results.token);
            window.localStorage.setItem('token', results.token);
            navigate('/');
        } else {

            console.log(results.error.message)
            return
        }
    }
    return (
        <div id="loginForm">
            <h1 id="loginHead">LOGIN</h1>
            <form onSubmit={(event) =>{
            event.preventDefault()
            handleSubmit();
        }}>
                <input
                    type = 'text'
                    placeholder="Enter Username"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button id='button'
            type='submit'>Submit</button>
            </form>

            <Link id='signUp' to={"/register"}>Sign Up</Link>
        </div>
    )
}

export default Login;