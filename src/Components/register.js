import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import "./CSS/Register.css";
import {
  Grid,
  Paper,
  TextField,
  Button
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';


const Register = ({ setToken }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const results = await registerUser(username, password);
    if (results.token) {
      setToken(results.token)
      window.localStorage.setItem('token', results.token)
      navigate('/')
    } else {
      alert('That username is taken')
    }
  }

  const checkPassword = async () => {
    if ((password === confirmPassword) && (password.length >= 8) && (password.length <= 16)) {
      handleSubmit();
    } else {
      alert("invalid password");
    }

  }


  return (
      <div id="registerForm">
        <div id='blurDiv'>
        <h1 id="loginHead">Register</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
          console.log(username, "username");
          console.log(password, "passwrod");
          console.log(confirmPassword, "confirmpassword");
          checkPassword();
        }}>
          
            
          <input
            type='text'  
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type='password'
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)} />
          <input
            type='password'
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)} />
          <button
            id='button'
            type='submit'
            disabled={((password === confirmPassword) && (password.length >= 8) && (password.length <= 16)) ? false : true}
          >
            Register
          </button>
        </form>

          <Link id='signUp' to={"/Login"}>Have an account already?</Link>
        <div id="passReqs">
          <h4 id='reqHeader'>Password Requirements:</h4>
          <ul>
            <div id='singleReq'>Pass must match:{(password === confirmPassword) ? (<div> <CheckCircleIcon sx={{ color: "green" }}></CheckCircleIcon> </div>) : (<div> <ErrorIcon sx={{ color: "red" }}></ErrorIcon></div>)}</div>
            <div id='singleReq'>Password must be at least 8 characters: {(password.length >= 8) ? (<div> <CheckCircleIcon sx={{ color: "green" }}></CheckCircleIcon> </div>) : (<div> <ErrorIcon sx={{ color: "red" }}></ErrorIcon></div>)} </div>
            <div id='singleReq'>Password must be less than 16 characters: {(password.length <= 16) ? (<div> <CheckCircleIcon sx={{ color: "green" }}></CheckCircleIcon> </div>) : (<div> <ErrorIcon sx={{ color: "red" }}></ErrorIcon></div>)} </div>
            <div id='singleReq'>Valid Password:{((password === confirmPassword) && (password.length >= 8) && (password.length <= 16)) ? (<div> <CheckCircleIcon sx={{ color: "green" }}></CheckCircleIcon> </div>) : (<div> <ErrorIcon sx={{ color: "red" }}></ErrorIcon></div>)}</div>
          </ul>
        </div>
        </div>
      </div>
  )
}

export default Register;