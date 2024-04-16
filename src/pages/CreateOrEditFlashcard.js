import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid, Paper, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CreateFlashcard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [setTitle, setSetTitle] = useState('');
    const [flashcard, setFlashcard] = useState({ front: '', back: '' });
    const [flashcards, setFlashcards] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);

    useEffect(() => {
        // This would be replaced with a call to your backend
        if (id) {
            const existingSets = JSON.parse(localStorage.getItem('studySets')) || [];
            const setToEdit = existingSets.find(set => set.id.toString() === id);
            if (setToEdit) {
                setSetTitle(setToEdit.title);
                setFlashcards(setToEdit.cards);
            } else {
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
        if (editingIndex >= 0) {
            const updatedFlashcards = flashcards.map((card, index) =>
                index === editingIndex ? flashcard : card
            );
            setFlashcards(updatedFlashcards);
        } else {
            setFlashcards([...flashcards, flashcard]);
        }
        setFlashcard({ front: '', back: '' });
        setEditingIndex(-1);
    };

    const handleEditFlashcard = (index) => {
        setFlashcard(flashcards[index]);
        setEditingIndex(index);
    };

    const handleDeleteFlashcard = (index) => {
        setFlashcards(flashcards.filter((_, i) => i !== index));
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
        navigate('/dashboard');
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={6} sx={{ p: 4, mt: 8, mb: 4 }}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton
                        aria-label="go back"
                        onClick={() => navigate('/dashboard')}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h5" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {id ? 'Edit Flashcard Set' : 'Create Flashcard Set'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveSet}
                        sx={{ textTransform: 'none' }}
                    >
                        Save Study Set
                    </Button>
                </Box>
                <TextField
                    fullWidth
                    label="Study Set Title"
                    value={setTitle}
                    onChange={(e) => setSetTitle(e.target.value)}
                    margin="normal"
                    variant="outlined"
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
                                margin="normal"
                                variant="outlined"
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
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mb: 2, textTransform: 'none' }}
                            >
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




/* Code to implement when its time to use Django and SQLite*/
/*
npm install axios


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Paper, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const CreateFlashcard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [setTitle, setSetTitle] = useState('');
    const [flashcard, setFlashcard] = useState({ front: '', back: '' });
    const [flashcards, setFlashcards] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);

    useEffect(() => {
        if (id) {
            axios.get(`/api/studysets/${id}/`)
                .then(response => {
                    setSetTitle(response.data.title);
                    setFlashcards(response.data.cards);
                })
                .catch(() => navigate('/dashboard'));
        }
    }, [id, navigate]);

    const handleChangeFlashcard = (e) => {
        const { name, value } = e.target;
        setFlashcard({ ...flashcard, [name]: value });
    };

    const handleAddOrUpdateFlashcard = (e) => {
        e.preventDefault();
        if (editingIndex >= 0) {
            const updatedFlashcards = flashcards.map((card, index) =>
                index === editingIndex ? flashcard : card
            );
            setFlashcards(updatedFlashcards);
        } else {
            setFlashcards([...flashcards, flashcard]);
        }
        setFlashcard({ front: '', back: '' });
        setEditingIndex(-1);
    };

    const handleEditFlashcard = (index) => {
        setFlashcard(flashcards[index]);
        setEditingIndex(index);
    };

    const handleDeleteFlashcard = (index) => {
        const remainingCards = flashcards.filter((_, i) => i !== index);
        setFlashcards(remainingCards);
    };

    const handleSaveSet = () => {
        if (!setTitle.trim() || flashcards.length === 0) {
            alert('Please provide a title for the set and add at least one flashcard.');
            return;
        }
        const studySet = {
            title: setTitle,
            cards: flashcards.map(({ id, front, back }) => ({ id, front, back }))
        };

        const method = id ? 'put' : 'post';
        const url = id ? `/api/studysets/${id}/` : '/api/studysets/';

        axios[method](url, studySet)
            .then(() => {
                alert('Study set saved successfully!');
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Failed to save the study set', error);
                alert('Failed to save the study set.');
            });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={6} sx={{ p: 4, mt: 8, mb: 4 }}>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <IconButton
                        aria-label="go back"
                        onClick={() => navigate('/dashboard')}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h5" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {id ? 'Edit Flashcard Set' : 'Create Flashcard Set'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveSet}
                        sx={{ textTransform: 'none' }}
                    >
                        Save Study Set
                    </Button>
                </Box>
                <TextField
                    fullWidth
                    label="Study Set Title"
                    value={setTitle}
                    onChange={(e) => setSetTitle(e.target.value)}
                    margin="normal"
                    variant="outlined"
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
                                margin="normal"
                                variant="outlined"
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
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mb: 2, textTransform: 'none' }}
                            >
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

*/

/* Notes From GPT:
Note: Make sure your Django backend is properly set up with endpoints /api/flashcards/ 
for POST (to create new sets) and /api/flashcards/{id}/ for GET and PUT (to fetch and update existing sets). 
Also, ensure that your Django application is configured to handle 
CORS issues that might arise when making requests from your frontend.

This complete component includes API integration for managing study sets and their flashcards. 
It handles adding new cards, editing existing ones, deleting, and saving the whole set back to 
your Django backend. Adjust API endpoints (/api/studysets/) as necessary to match your actual Django setup.*/