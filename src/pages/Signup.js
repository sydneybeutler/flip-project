import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Link, CssBaseline, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
    const [signupData, setSignupData] = useState({
        emailOrPhone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Simple password match check
        if (signupData.password !== signupData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Example POST request to your future Django API
        try {
            const response = await fetch('http://your-django-api-url/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailOrPhone: signupData.emailOrPhone,
                    password: signupData.password,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setSuccess(true);
                navigate('/login'); // Navigate to login page on successful signup
            } else {
                setError(data.message || 'Failed to register. Please try again.');
            }
        } catch (error) {
            setError('Network error or server is not responding.');
        }
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
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ width: '100%' }}>Registration successful!</Alert>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={signupData.emailOrPhone}
                        onChange={handleChange}
                        variant="outlined"
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
                        variant="outlined"
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
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        Sign Up
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
