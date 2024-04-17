import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Flashcard = ({ front, back }) => {
  const [showBack, setShowBack] = useState(false);

  const handleClick = () => {
    setShowBack(!showBack);
  };

  return (
    <Card
      style={{ width: '600px', maxWidth: '90%', margin: '20px auto', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <CardContent style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
          {showBack ? back : front}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SimpleFlashcard = ({ flashcards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handlePrevCard = () => {
    setCurrentCardIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextCard = () => {
    setCurrentCardIndex(prevIndex => Math.min(prevIndex + 1, flashcards.length - 1));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" style={{ minHeight: '80vh', paddingTop: '20px' }}>
      {flashcards.length > 0 ? (
        <>
          <Box mb={2}>
            <Flashcard front={flashcards[currentCardIndex].front} back={flashcards[currentCardIndex].back} />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" width="100%" px={4}>
            <IconButton onClick={handlePrevCard} disabled={currentCardIndex === 0} sx={{ marginRight: '10px' }}>
              <NavigateBeforeIcon />
            </IconButton>
            <Typography variant="h6">{`${currentCardIndex + 1}/${flashcards.length}`}</Typography>
            <IconButton onClick={handleNextCard} disabled={currentCardIndex === flashcards.length - 1} sx={{ marginLeft: '10px' }}>
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <Typography>No flashcards found</Typography>
      )}
    </Box>
  );
};

export default SimpleFlashcard;
