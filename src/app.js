import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const fetchProducts = async () => {
        try {
            console.log("in fetchProd, useEff")
            const response = await fetch("http://localhost:3000/api/products", {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("look", response)
            const products = await response.json();
            console.log(products)
            setProducts(products);
        } catch (error) {
            console.log(error)

        }
    };

    async function getMe() {
        const storedToken = window.localStorage.getItem('token');
        if (!token) {
            if (storedToken) {
                setToken(storedToken);
            }
            return;
        }
    }

        function logout() {
            window.localStorage.removeItem('token');
            setToken('')
            setUser({});
            navigate('/')
        }



        /*const fetchUser = async = () => {
    
        }*/

        useEffect(() => {
            console.log("in useeffect")
            fetchProducts();
        }, []);

        useEffect(() => {
            getMe()
        }, [token]);

        return (
            <div>
                <Navbar
                    token={token}
                    logout={logout}
                    user={user} />
                <Routes>
                    <Route path="/" element={<Home
                        logout={logout}
                    />} />

                    <Route path="/login" element={
                        <Login username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            user={user}
                            setUser={setUser}
                            setToken={setToken}
                            navigate={navigate}
                        />
                    } />

                    <Route path='/profile' element={
                        <Profile
                            user={user} />}
                    />
                    <Route path="/register" element={
                        <Register
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            setUser={setUser}
                            token={token}
                            setToken={setToken}
                        />
                    } />

                    <Route path="/products" element={
                        <Products
                            products={products}
                            setProducts={setProducts}
                        />
                    } />

                    <Route path="/products/:productId" element={
                        <ProductView
                            products={products}
                            user={user}
                            token={token}
                    
                        />
                    } />

                    <Route path="/cart" element={
                        <Cart
                        // token={token}
                        />
                    } />

                </Routes>
            </div>
        );

    }


    export default App;