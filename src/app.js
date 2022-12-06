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
        try {console.log("in fetchProd, useEff")
        const response = await fetch("http://localhost:3000/api/products", {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        console.log("look", response)
        const products  = await response.json();
        console.log(products)
        setProducts(products);
    } catch(error) {
        console.log(error)
        
    }
    };

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

    return(
        <div>
         <Navbar 
            token={token}
            logout={logout} 
            user={user} />
        <Routes>
            <Route path="/" element={<Home
                    logout={logout}
                    />}/>

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
                token = {token}
                setToken = {setToken}
                />
            }/>

            <Route path="/products" element= {
                <Products 
                products = {products}
                setProducts = {setProducts}
                />
            }/>

            <Route path="/products/:productId" element= {
                <ProductView
                products ={products}
                user = {user}
                // fetchAllUserCartItems ={fetchAllUserCartItems}
                // navigate = {navigate}
                />
            }/>

            <Route path="/cart" element= {
                <Cart
                    token={token}

                />
            }/>

        </Routes>
        </div>
    );

}


export default App;