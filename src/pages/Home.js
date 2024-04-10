import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../components/Header'; // Make sure the path is correct
import { Container, Typography, Button, Box } from '@mui/material';

const Home = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    return (
        <>
            <Header showLoginButton={true} />
            <Container component="main" maxWidth="md">
                <Box sx={{ mt: 6, mb: 4, textAlign: 'center' }}>
                    <Typography variant="h2" gutterBottom>
                        Master Any Subject, One Flashcard At A Time
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Discover the best way to learn and memorize important topics with Flip!
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 3, mr: 2 }}
                        onClick={() => navigate('/dashboard')} // Navigate to Dashboard
                    >
                        Dashboard
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 3 }}
                        onClick={() => navigate('/dashboard')} // Utilize useNavigate to navigate to Dashboard
                        >
                        Go to Dashboard
                    </Button>

                </Box>
            </Container>
        </>
    );
};

export default Home;
