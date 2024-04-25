import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { redirectToLogin } from '../pages/authService';

const Header = ({ showLoginButton = true }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Clickable title that navigates to the home page */}
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ flexGrow: 1, cursor: 'pointer' }} 
                    onClick={() => navigate('/Home')}
                >
                    Flip!
                </Typography>
                
                {/* Conditionally displayed login button */}
                {showLoginButton && (
                    <Button color="inherit" onClick={() => redirectToLogin()}>
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
