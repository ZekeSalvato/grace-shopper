import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    Grid,
    Button,
} from '@mui/material';

const Navbar = ({ logout }) => {
    const token = window.localStorage.getItem('token')

    const linkStyle = {
        textDecoration: "none",
        color: 'white',
        fontSize: "1.5rem"

    };
    return (
        <AppBar sx={{ bgcolor: "hotPink" }}
            position='sticky'
            >
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
                        justifyContent={"space-between"}
                    >
                        <Link to='/' style={linkStyle}>Home</Link>

                        <Link to='/profile' style={linkStyle}>Profile</Link>
                        <Link to='/products' style={linkStyle}>Products</Link>
                        <Link to='/cart' style={linkStyle}>Cart</Link>

                        {token ? (
                            <Link to='/' style={linkStyle} onClick={() => logout()}>Logout</Link>
                        ) : (
                            <>
                                <Link to='/login' style={linkStyle}>Login</Link>
                                <Link to='/register' style={linkStyle}>Register</Link>
                            </>
                        )

                        }

                    </Grid>
                </Toolbar>
            </CssBaseline>
        </AppBar>
    )
}

export default Navbar;