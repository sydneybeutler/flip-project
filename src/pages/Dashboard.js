import React, { useState, useEffect } from 'react';
import { Container, Paper, List, ListItem, ListItemButton, ListItemText, IconButton, Button, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SchoolIcon from '@mui/icons-material/School'; // Import an icon for the "Study" button
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [studySets, setStudySets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadedStudySets = JSON.parse(localStorage.getItem('studySets')) || [];
        setStudySets(loadedStudySets);
    }, []);

    const handleDelete = (setId) => {
        const confirmation = window.confirm('Are you sure you want to delete this study set?');
        if (confirmation) {
            const updatedStudySets = studySets.filter(set => set.id !== setId);
            localStorage.setItem('studySets', JSON.stringify(updatedStudySets));
            setStudySets(updatedStudySets);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Your Study Sets
                </Typography>
                <Button
                    startIcon={<AddCircleOutlineIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/create')}
                >
                    Create New Study Set
                </Button>
            </Box>
            <Paper elevation={6} sx={{ mt: 2, overflow: 'hidden', borderRadius: 2 }}>
                <List>
                    {studySets.length > 0 ? studySets.map((set) => (
                        <ListItem
                            key={set.id}
                            secondaryAction={
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton color="info" onClick={() => navigate(`/study/${set.id}`)} aria-label="study">
                                        <SchoolIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => navigate(`/edit/${set.id}`)} aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(set.id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText primary={set.title} secondary={`Cards: ${set.cards.length}`} />
                            </ListItemButton>
                        </ListItem>
                    )) : (
                        <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                            No study sets found. Click "Create New Study Set" to get started!
                        </Typography>
                    )}
                </List>
            </Paper>
        </Container>
    );
};

export default Dashboard;


/* Code for when we have a backend set up*/
/*
import React, { useState, useEffect } from 'react';
import { Container, Paper, List, ListItem, ListItemButton, ListItemText, IconButton, Button, Typography, Box, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [studySets, setStudySets] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the study sets from the backend
        fetch('http://localhost:8000/api/studysets/')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => setStudySets(data))
            .catch(error => {
                console.error('Error fetching study sets:', error);
                setError('Failed to fetch study sets.');
            });
    }, []);

    const handleDelete = (setId) => {
        const confirmation = window.confirm('Are you sure you want to delete this study set?');
        if (confirmation) {
            fetch(`http://localhost:8000/api/studysets/${setId}/`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    const updatedStudySets = studySets.filter(set => set.id !== setId);
                    setStudySets(updatedStudySets);
                } else {
                    throw new Error('Failed to delete the study set.');
                }
            })
            .catch(error => {
                console.error('Error deleting study set:', error);
                setError('Failed to delete study set.');
            });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Your Study Sets
                </Typography>
                <Button
                    startIcon={<AddCircleOutlineIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/create')}
                >
                    Create New Study Set
                </Button>
            </Box>
            <Paper elevation={6} sx={{ mt: 2, overflow: 'hidden', borderRadius: 2 }}>
                <List>
                    {studySets.length > 0 ? studySets.map((set) => (
                        <ListItem
                            key={set.id}
                            secondaryAction={
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton color="info" onClick={() => navigate(`/study/${set.id}`)} aria-label="study">
                                        <SchoolIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => navigate(`/edit/${set.id}`)} aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(set.id)} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText primary={set.title} secondary={`Cards: ${set.cards.length}`} />
                            </ListItemButton>
                        </ListItem>
                    )) : (
                        <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                            No study sets found. Click "Create New Study Set" to get started!
                        </Typography>
                    )}
                </List>
            </Paper>
        </Container>
    );
};

export default Dashboard;
*/