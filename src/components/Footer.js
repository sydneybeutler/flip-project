// src/components/Footer.js
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3 }}>
            <Container maxWidth="lg">
                <Typography variant="body1" align="center">
                    My Flashcard App © {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
};


export default Footer;
