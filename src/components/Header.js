// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ showLoginButton = true }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Flip!
                </Typography>
                {showLoginButton && (
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
