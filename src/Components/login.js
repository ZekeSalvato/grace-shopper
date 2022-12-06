import { React, useState } from 'react';
import { logInUser } from '../api';
import { useNavigate, Link  } from 'react-router-dom';
import "./CSS/Login.css";


const Login = (props) => {
    const { setToken } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const results = await logInUser(username, password);
        if (results.success) {
            setToken(results.data.token);
            window.localStorage.setItem('token', results.data.token);
            navigate('/home');
        } else {
            console.log(results.error.message)
        }
    }
    return (
      <form className='Login' onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
        <TextField className='enterLoginUsername'
          label='username'
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField className='enterLoginPassword'
          label='password'
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>
    )
}

export default Login;