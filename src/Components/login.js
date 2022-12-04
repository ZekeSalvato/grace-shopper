import React, {useState} from 'react';
import { loginUser } from '../api';
import { useNavigate  } from 'react-router-dom';

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
            navigate('/')
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