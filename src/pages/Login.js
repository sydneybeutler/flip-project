import React from 'react';
import { Container, Typography, Box, Link, Paper, CssBaseline, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';  // Make sure the path is correct 

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
     
    };

    const handleSignUp = () => {
        navigate('/signup');  // Navigate to your sign-up page (adjust the route as necessary)
    };

    return (
        <>
            <Header showBackHome={true} />
            <CssBaseline />
            <Container component="main" maxWidth="sm">
                <Paper elevation={6} sx={{
                    my: { xs: 3, md: 6 },
                    p: { xs: 2, md: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '12px',
                    boxShadow: '0 3px 5px 2px rgba(105, 140, 255, .3)',
                }}>
                    <Typography component="h1" variant="h4" color="primary" gutterBottom>
                        Log into Flip!
                    </Typography>
                    <Box sx={{ mt: 1, width: '100%' }}>
                        <Button
                            onClick={handleLogin}
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            Sign In with Cognito
                        </Button>
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                            <Link onClick={handleLogin} variant="body2" style={{cursor: 'pointer'}}>
                                Forgot Password?
                            </Link>
                            <Link onClick={handleSignUp} variant="body2" style={{cursor: 'pointer'}}>
                                Not Registered? Sign Up Now
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default Login;

