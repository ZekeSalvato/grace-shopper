import React from "react";
import {Link} from 'react-router-dom';

const Navbar = ({logout, token}) => {
    return(
        <header>
            <nav className="navbar">
                <Link to= '/'>Home</Link>
                <Link to= '/profile'>Profile</Link>
                <Link to= '/products'>Products</Link>
                <Link to= '/cart'>Cart</Link>
                
                { token ? (
                    <Link to= '/home' onClick={() => logout()}>Logout</Link>
                ): (
                    <>
                    <Link to= '/login'>Login</Link>
                    <Link to= '/register'>Register</Link>
                    </>
                )
                    
}
            </nav>
        </header>
    )
}

export default Navbar;