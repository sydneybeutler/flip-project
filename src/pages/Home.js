import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import HeroImage from '../hero-image.jpg';  // Assuming you have an image in your assets

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="lg">
            <Paper elevation={3} sx={{ mt: 8, py: 5, px: 2, backgroundColor: '#f5f5f5', borderRadius: '12px' }}>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
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
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={HeroImage}
                                alt="Study image"
                                height="400"
                            />
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Card raised sx={{ minHeight: 200 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Flashcards
                                </Typography>
                                <Typography variant="body2">
                                    Use our smart flashcards to memorize topics faster.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card raised sx={{ minHeight: 200 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Spaced Repetition
                                </Typography>
                                <Typography variant="body2">
                                    Leverage spaced repetition algorithms to enhance your learning efficiency.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card raised sx={{ minHeight: 200 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Track Progress
                                </Typography>
                                <Typography variant="body2">
                                    Keep track of your learning progress with detailed analytics.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Home;
