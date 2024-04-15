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
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
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
            <Paper elevation={3} sx={{ mt: 2 }}>
                <List>
                    {studySets.length > 0 ? studySets.map((set) => (
                        <ListItem
                            key={set.id}
                            secondaryAction={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton edge="end" onClick={() => navigate(`/study/${set.id}`)} aria-label="study">
                                        <SchoolIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => navigate(`/edit/${set.id}`)} aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDelete(set.id)} aria-label="delete">
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
                        <Typography sx={{ p: 2, textAlign: 'center' }}>No study sets found. Create a new one!</Typography>
                    )}
                </List>
            </Paper>
        </Container>
    );
};

export default Dashboard;
