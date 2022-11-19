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
} from "./Components/Index";

const App = () => {

    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    const fetchProducts = async () => {
        const response = await fetch("http://localhost:3000/api/products");
        console.log(response)
        const { products } = await response.json();
        setProducts(products);
    };

    /*const fetchUser = async = () => {

    }*/

    // useEffect(() => {
    //     fetchProducts();
    // }, []);

    return(
        <div>
            <Navbar token={token} />
        <Routes>
            <Route path="/" element={<Home />}/>

            <Route path="/login" element={
                <Login username = {username}
                setUsername = {setUsername}
                password = {password}
                setPassword = {setPassword}
                user = {user}
                setUser = {setUser}
                />
            }/>
            

            <Route path="/register" element ={
                <Register 
                username = {username}
                setUsername = {setUsername}
                password = {password}
                setPassword = {setPassword}
                setUser = {setUser}
                />
            }/>

            <Route path="/products" element= {
                <Products 
                products = {products}
                setProducts = {setProducts}
                />
            }/>



        </Routes>
        </div>
    );

}


export default App;