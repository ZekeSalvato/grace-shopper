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
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    const fetchProducts = async () => {
        const response = await fetch("./api/products");
        const { products } = await response.json();
        setProducts(products);
    };

    /*const fetchUser = async = () => {

    }*/

    useEffect(() => {
        fetchProducts();
    }, []);

    return(
        <div>
        <Routes>
            <Route path="/" element={<Home />}/>

            <Route path="/login">
                <Login username = {username}
                setUsername = {setUsername}
                password = {password}
                setPassword = {setPassword}
                user = {user}
                setUser = {setUser}
                />
            </Route>

            <Route path="/register">
                <Register 
                username = {username}
                setUsername = {setUsername}
                password = {password}
                setPassword = {setPassword}
                setUser = {setUser}
                />
            </Route>

            <Route path="/products">
                <Products 
                products = {products}
                setProducts = {setProducts}
                />
            </Route>



        </Routes>
        </div>
    );

}


export default App