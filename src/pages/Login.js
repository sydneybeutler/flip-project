// src/pages/Login.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Link, Paper } from '@mui/material';
import Header from '../components/Header'; // Make sure the path is correct

const Login = () => {
    const [credentials, setCredentials] = useState({
        emailOrPhone: '',
        password: '',
    });

    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would handle the login logic
        console.log(credentials);
        // After successful login, you might navigate to the dashboard or show an error
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
