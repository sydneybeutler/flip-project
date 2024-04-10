import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid, Paper, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateFlashcard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [setTitle, setSetTitle] = useState('');
    const [flashcard, setFlashcard] = useState({ front: '', back: '' });
    const [flashcards, setFlashcards] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);

    useEffect(() => {
        // Load the existing set for editing if an ID is provided
        if (id) {
            const existingSets = JSON.parse(localStorage.getItem('studySets')) || [];
            const setToEdit = existingSets.find(set => set.id.toString() === id);
            if (setToEdit) {
                setSetTitle(setToEdit.title);
                setFlashcards(setToEdit.cards);
            } else {
                // If no set is found with the given ID, navigate back to dashboard
                navigate('/dashboard');
            }
        }
    }, [id, navigate]);

    const handleChangeFlashcard = (e) => {
        const { name, value } = e.target;
        setFlashcard({ ...flashcard, [name]: value });
    };

    const handleAddOrUpdateFlashcard = (e) => {
        e.preventDefault();
        if (!flashcard.front || !flashcard.back) {
            alert('Please fill in both sides of the flashcard.');
            return;
        }
        let updatedFlashcards = [...flashcards];
        if (editingIndex >= 0) {
            updatedFlashcards[editingIndex] = flashcard;
        } else {
            updatedFlashcards.push(flashcard);
        }
        setFlashcards(updatedFlashcards);
        setFlashcard({ front: '', back: '' }); // Reset form
        setEditingIndex(-1); // Reset editing index
    };

    const handleEditFlashcard = (index) => {
        setFlashcard(flashcards[index]);
        setEditingIndex(index);
    };

    const handleDeleteFlashcard = (index) => {
        const filteredFlashcards = flashcards.filter((_, i) => i !== index);
        setFlashcards(filteredFlashcards);
        if (index === editingIndex) {
            setFlashcard({ front: '', back: '' }); // Reset form if the card being edited is deleted
            setEditingIndex(-1);
        }
    };

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
        const updatedSets = id ? existingSets.map(set => set.id.toString() === id ? newSet : set) : [...existingSets, newSet];

        localStorage.setItem('studySets', JSON.stringify(updatedSets));
        alert('Study set saved successfully!');
        navigate('/dashboard'); // Navigate back to the dashboard
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={6} sx={{ p: 4, mt: 8 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5">
                        {editingIndex >= 0 ? 'Edit Flashcard' : 'Create Flashcards for Set'}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleSaveSet}>
                        Save Study Set
                    </Button>
                </Box>
                <TextField
                    fullWidth
                    label="Study Set Title"
                    value={setTitle}
                    onChange={(e) => setSetTitle(e.target.value)}
                    margin="normal"
                />
                <form onSubmit={handleAddOrUpdateFlashcard}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Front (Question)"
                                name="front"
                                value={flashcard.front}
                                onChange={handleChangeFlashcard}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Back (Answer)"
                                name="back"
                                value={flashcard.back}
                                onChange={handleChangeFlashcard}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mb: 2 }}>
                                {editingIndex >= 0 ? 'Update Flashcard' : 'Add Flashcard'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <List sx={{ mt: 4 }}>
                    {flashcards.map((card, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" onClick={() => handleEditFlashcard(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDeleteFlashcard(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText primary={card.front} secondary={card.back} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default CreateFlashcard;
