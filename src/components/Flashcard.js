// src/components/Flashcard.js
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlipIcon from '@mui/icons-material/Flip';

const FlashcardContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
});

const Flashcard = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const handleFlip = () => setFlip(!flip);
  const handleNext = () => {
    setFlip(false); // Reset flip on next
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  if (!flashcards.length) {
    return <Typography>No flashcards found</Typography>;
  }

  const { front, back } = flashcards[currentIndex];

  return (
    <FlashcardContainer>
      <Card sx={{ maxWidth: 345, minHeight: 200, position: 'relative', transform: `rotateY(${flip ? 180 : 0}deg)`, transition: 'transform 0.6s' }}>
        <CardContent sx={{ textAlign: 'center', position: 'absolute', width: '100%', backfaceVisibility: 'hidden' }}>
          <Typography>{flip ? back : front}</Typography>
        </CardContent>
        <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
          <IconButton onClick={handleFlip} aria-label="flip">
            <FlipIcon />
          </IconButton>
          <Button onClick={handleNext}>Next</Button>
        </Box>
      </Card>
    </FlashcardContainer>
  );
};

export default Flashcard;
