import React from 'react';
import { Container, Typography, Button, Box, Paper, Link, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { redirectToSignUp } from './authService'; 

const Signup = () => {
    const navigate = useNavigate();

    // Handle the redirection to the AWS Cognito signup page
    const handleSignUp = () => {
        redirectToSignUp();  // Redirects to AWS Cognito's hosted UI for signup
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
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
                    Create Account on Flip!
                </Typography>
                <Box sx={{ mt: 1, width: '100%' }}>
                    <Button
                        onClick={handleSignUp}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        Sign Up with Cognito
                    </Button>
                    <Box textAlign="center" sx={{ mt: 2 }}>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already registered? Sign In Now
                        </Link>
                    </Box>
                    <Box textAlign="center" sx={{ mt: 2 }}>
                        <Link component={RouterLink} to="/home" variant="body2" sx={{ textDecoration: 'none' }}>
                            ← Back to Home
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;

