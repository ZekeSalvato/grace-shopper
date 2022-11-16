import { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import {
    Cart,
    Home,
    Login,
    Navbar,
    Products,
    ProductView,
    Profile,
    Register,
    Reviews,
    Users
} from "./Components";

const App = () => {

    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState('');
    const [user, setUser] = useState({});
    const [token, setToken] = useState('')

    return(
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login /> 
            <Route /> 
            <Route /> 
        </Routes>
    )

}


export default App