import React, {useState} from 'react';
import { logInUser } from '../api';

const Login = ({ setToken, navigate}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const results = await logInUser(username, password);
        if (results.success) {
            setToken(results.data.token);
            window.localStorage.setItem('token', results.data.token);
            navigate('/profile')
        } else {
            return
        }
    }
    return (
        <form onSubmit={(event) =>{
            event.preventDefault()
            handleSubmit();
        }}>
            <input
            type= 'text'
            placeholder='Enter Username'
            onChange={(event) =>setUsername(event.target.value)}/>
            <input
            type='password'
            placeholder='Enter Password'
            onChange={(event) =>setPassword(event.target.value)}/>
            <button id='button'
            type='submit'>Submit</button>
        </form>
    )
}

export default Login;