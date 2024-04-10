// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="lg">
            <Paper elevation={3} sx={{ mt: 8, py: 5, px: 2, backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box textAlign="center">
                            <Typography variant="h2" component="h1" gutterBottom>
                                Master Any Subject, One Flashcard At A Time
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4 }}>
                                Discover the best way to learn and memorize important topics with Flip!
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                sx={{ mr: 2 }}
                                onClick={() => navigate('/signup')}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </Grid>
                    {/* Image or graphic section */}
                </Grid>
            </Paper>
        </Container>
    );
};

export default Home;
