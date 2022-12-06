import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuIcon } from '@mui/material';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';


// react.school/material-ui

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    customColor: {
        // or hex code, this is normal CSS background-color
        backgroundColor: green[500]
    },
    customHeight: {
        minHeight: 200
    },
    offset: theme.mixins.toolbar
}));


const Navbar = ({ logout, token }) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const settings = [<Link to={"/profile"}>Profile</Link>     ,    <Link to={"/"} onClick={() => logout()} >Logout</Link> ];
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    const classes = useStyles();
    const [example, setExample] = useState("primary");
    const isCustomColor = example === "customColor";
    const isCustomHeight = example === "customHeight";

    return (
        <React.Fragment>
            <AppBar
                color={isCustomColor || isCustomHeight ? "primary" : example}
                className={`${isCustomColor && classes.customColor} ${isCustomHeight && classes.customHeight
                    }`}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Grace Shopper
                    </Typography>
                    <IconButton color="inherit" component={Link} to='/'>
                        Home
                    </IconButton>
                    <IconButton color="inherit" component={Link} to='/Products'>
                        Products
                    </IconButton>
                    <IconButton color="inherit" component={Link} to='/Cart'>
                        Cart
                    </IconButton>
                    {token ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar  sx={{ bgcolor: 'inherit'}} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            <IconButton color="inherit" component={Link} to='/Login'>
                                Login
                            </IconButton><IconButton color="inherit" component={Link} to='/Register'>
                                Register
                            </IconButton>
                        </>
                    )
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment >
    )
}

export default Navbar;