import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleFlashcard from '../components/Flashcard';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectToken } from '../reducers/authSlice'; 
import axios from 'axios';

const StudyPage = () => {
    const { setId } = useParams();
    const navigate = useNavigate();
    const token = useSelector(selectToken);
    const [studySet, setStudySet] = useState(null);

    useEffect(() => {
    const studySets = JSON.parse(localStorage.getItem('studySets')) || [];
    const setToStudy = studySets.find(set => set.id === setId);
    if (!setToStudy) {
      alert('No such study set found!');
      navigate('/dashboard');
    } else {
      setStudySet(setToStudy.cards);
    }
  }, [setId, navigate]);

  return studySet ? <SimpleFlashcard flashcards={studySet} /> : <Typography>Loading...</Typography>;
};

export default StudyPage;

