import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Link, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Make sure the path is correct

const Login = () => {
    const [credentials, setCredentials] = useState({
        emailOrPhone: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://your-django-api-url/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailOrPhone: credentials.emailOrPhone,
                    password: credentials.password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                // Navigate to dashboard or other appropriate page
                navigate('/dashboard'); // Adjust the path as needed for your routing
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Network error or server is not responding.');
        }
    };

    return (
        <>
            <Header showBackHome={true} /> {/* This will show the header with a "Back to Home" button */}
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" align="center">
                        Log into Flip!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="emailOrPhone"
                            label="Email or Phone"
                            name="emailOrPhone"
                            autoComplete="email"
                            autoFocus
                            value={credentials.emailOrPhone}
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
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Link href="#" variant="body2">
                                Forgot Password?
                            </Link>
                            <Link href="/signup" variant="body2"> {/* This href directs to the Signup page */}
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
