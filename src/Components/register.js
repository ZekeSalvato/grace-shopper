import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import "./CSS/Register.css";

const Register = ({ setToken }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Password Don't Match")
      return null
    }
    const results = await registerUser(username, password);
    if (results.token) {
      setToken(results.token)
      window.localStorage.setItem('token', results.token)
      navigate('/')
    } else {
      alert('That username is taken')
    }
  }
  return (
    <div id='loginForm'>
      <h1 id='loginHead'>Register</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
        <input
          type='text'
          placeholder="Enter Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type='password'
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)} />
        <input
          type='password'
          placeholder="Confirm Password"
          onChange={(event) => setConfirmPassword(event.target.value)} />
        <button
          id='button'
          type='submit'>
          Register
        </button>
      </form>
      <Link id='signUp' to={"/Login"}>Already Have an Account? Login Here!</Link>

    </div>
  )
}

export default Register;