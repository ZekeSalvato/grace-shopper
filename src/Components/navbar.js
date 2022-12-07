import React from "react";
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    Grid,
    Button,
} from '@mui/material';

const Navbar = ({ logout}) => {
    const token = window.localStorage.getItem('token')
    return (
        <AppBar
            position='static'
            style={{}}>
            <CssBaseline>
                <Toolbar>
                    <Grid container>
                        <Typography
                            type="title"
                            style={{
                                fontSize: '1.75rem',

                            }}>
                            Grace Shopper
                        </Typography>
                    </Grid>
                    <Grid container
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end">
                        <Typography>
                            <Link to='/'>Home</Link>

                            <Link to='/profile'>Profile</Link>
                            <Link to='/products'>Products</Link>
                            <Link to='/cart'>Cart</Link>

                            {token ? (
                                <Link to='/home' onClick={() => logout()}>Logout</Link>
                            ) : (
                                <>
                                    <Link to='/login'>Login</Link>
                                    <Link to='/register'>Register</Link>
                                </>
                            )

                            }            </Typography>

                    </Grid>
                </Toolbar>
            </CssBaseline>
        </AppBar>
    )
}

export default Navbar;