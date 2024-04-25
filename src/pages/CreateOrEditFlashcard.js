import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid, Paper, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CreateOrEditFlashcard = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // If 'id' is present, we are editing an existing set
    const [setTitle, setSetTitle] = useState('');
    const [flashcard, setFlashcard] = useState({ front: '', back: '' });
    const [flashcards, setFlashcards] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);

    // Fetch the existing study set from localStorage if editing
    useEffect(() => {
        if (id) {
            const existingSets = JSON.parse(localStorage.getItem('studySets')) || [];
            const setToEdit = existingSets.find(set => set.id === id);
            if (setToEdit) {
                setSetTitle(setToEdit.title);
                setFlashcards(setToEdit.cards);
            } else {
                navigate('/dashboard'); // Redirect if the set is not found
            }
        }
    }, [id, navigate]);

    // Update the local flashcard state on field changes
    const handleChangeFlashcard = (e) => {
        const { name, value } = e.target;
        setFlashcard({ ...flashcard, [name]: value });
    };

    // Add or update a flashcard in the local state
    const handleAddOrUpdateFlashcard = (e) => {
        e.preventDefault();
        if (editingIndex >= 0) {
            // Update an existing flashcard
            const updatedFlashcards = flashcards.map((card, index) =>
                index === editingIndex ? flashcard : card
            );
            setFlashcards(updatedFlashcards);
        } else {
            // Add a new flashcard
            setFlashcards([...flashcards, flashcard]);
        }
        // Reset the flashcard form and editing index
        setFlashcard({ front: '', back: '' });
        setEditingIndex(-1);
    };

    // Populate the form for editing an existing flashcard
    const handleEditFlashcard = (index) => {
        setFlashcard(flashcards[index]);
        setEditingIndex(index);
    };

    // Delete a flashcard from the local state
    const handleDeleteFlashcard = (index) => {
        setFlashcards(flashcards.filter((_, i) => i !== index));
    };

    // Save the entire study set to localStorage
    const handleSaveSet = () => {
        if (!setTitle.trim() || flashcards.length === 0) {
            alert('Please provide a title for the set and add at least one flashcard.');
            return;
        }
        const newSet = {
            id: id ? id : Date.now().toString(),
            title: setTitle,
            cards: flashcards
        };
        const existingSets = JSON.parse(localStorage.getItem('studySets')) || [];
        const updatedSets = id ? existingSets.map(set => set.id === id ? newSet : set) : [...existingSets, newSet];
        localStorage.setItem('studySets', JSON.stringify(updatedSets));
        alert('Study set saved successfully!');
        navigate('/dashboard');
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={6} sx={{ p: 4, mt: 8, mb: 4 }}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton aria-label="go back" onClick={() => navigate('/dashboard')}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h5" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {id ? 'Edit Flashcard Set' : 'Create Flashcard Set'}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleSaveSet} sx={{ textTransform: 'none' }}>
                        Save Study Set
                    </Button>
                </Box>
                <TextField fullWidth label="Study Set Title" value={setTitle} onChange={(e) => setSetTitle(e.target.value)} margin="normal" variant="outlined" />
                <form onSubmit={handleAddOrUpdateFlashcard}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="Front (Question)" name="front" value={flashcard.front} onChange={handleChangeFlashcard} margin="normal" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required fullWidth label="Back (Answer)" name="back" value={flashcard.back} onChange={handleChangeFlashcard} margin="normal" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mb: 2, textTransform: 'none' }}>
                                {editingIndex >= 0 ? 'Update Flashcard' : 'Add Flashcard'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <List sx={{ mt: 4 }}>
                    {flashcards.map((card, index) => (
                        <ListItem key={index} secondaryAction={
                            <>
                                <IconButton edge="end" onClick={() => handleEditFlashcard(index)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleDeleteFlashcard(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemText primary={card.front} secondary={card.back} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default CreateOrEditFlashcard;


