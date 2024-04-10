import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
    const [signupData, setSignupData] = useState({
        emailOrPhone: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add sign-up logic here
        console.log(signupData);
        // After successful signup, you might navigate to the dashboard or login page
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ marginTop: 8, padding: 4 }}>
                <Typography component="h1" variant="h5" align="center">
                    Create Account on Flip!
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="emailOrPhone"
                        label="Email or Phone"
                        name="emailOrPhone"
                        autoComplete="email"
                        autoFocus
                        value={signupData.emailOrPhone}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={signupData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Box textAlign="center">
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already registered? Sign In Now
                        </Link>
                        <Link component={RouterLink} to="/" variant="body2" sx={{ mt: 2 }}>
                            ← Back to Home
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;
