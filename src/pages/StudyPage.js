import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Flashcard from '../components/Flashcard';
import Header from '../components/Header'; // Assuming you have a Header component

const StudyPage = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const [studySet, setStudySet] = useState(null);

  useEffect(() => {
    const allStudySets = JSON.parse(localStorage.getItem('studySets')) || [];
    const setToStudy = allStudySets.find(set => set.id.toString() === setId);
    if (!setToStudy) {
      alert('No such study set found!');
      navigate('/dashboard'); // Redirect if not found
    } else {
      setStudySet(setToStudy.cards);
    }
  }, [setId, navigate]);

  // No need to pass 'showBackHome' since there is no prop by this name in your Header component
  return (
    <>
      <Header showLoginButton={false} /> {/* Do not show the login button on the study page */}
      {studySet ? (
        <Flashcard flashcards={studySet} />
      ) : (
        <Typography>Loading or no flashcards available...</Typography>
      )}
    </>
  );
};

export default StudyPage;
