import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Link, Paper, Alert, CssBaseline } from '@mui/material';
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
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Network error or server is not responding.');
        }
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
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={credentials.emailOrPhone}
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
                            autoComplete="current-password"
                            value={credentials.password}
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
                            Sign In
                        </Button>
                        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                            <Link href="#" variant="body2">
                                Forgot Password?
                            </Link>
                            <Link href="/signup" variant="body2">
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
