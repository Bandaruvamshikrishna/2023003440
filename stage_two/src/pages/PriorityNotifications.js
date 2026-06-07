import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../api';
import { Container, Card, CardContent, Typography, Grid, Chip, TextField, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

export default function PriorityNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [limit, setLimit] = useState(10);
    const [type, setType] = useState('');
    const readIds = JSON.parse(localStorage.getItem('readNotifs')) || [];

    useEffect(() => {
        const params = { limit };
        if (type) params.notification_type = type;
        
        fetchNotifications(params)
            .then(data => {
                // Sorting logic from Stage 1 can be reapplied here if API doesn't pre-sort
                const weights = { "Placement": 3, "Result": 2, "Event": 1 };
                const sorted = data.sort((a, b) => {
                    const diff = (weights[b.Type] || 0) - (weights[a.Type] || 0);
                    return diff !== 0 ? diff : new Date(b.Timestamp) - new Date(a.Timestamp);
                });
                setNotifications(sorted);
            })
            .catch(console.error);
    }, [limit, type]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Priority Inbox</Typography>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField 
                    type="number" 
                    label="Top 'n' Limit" 
                    value={limit} 
                    onChange={(e) => setLimit(e.target.value)} 
                    size="small"
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Type Filter</InputLabel>
                    <Select value={type} label="Type Filter" onChange={(e) => setType(e.target.value)}>
                        <MenuItem value=""><em>All Types</em></MenuItem>
                        <MenuItem value="Event">Event</MenuItem>
                        <MenuItem value="Result">Result</MenuItem>
                        <MenuItem value="Placement">Placement</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={2}>
                {notifications.map(n => (
                    <Grid item xs={12} sm={6} md={4} key={n.ID}>
                        <Card sx={{ bgcolor: readIds.includes(n.ID) ? '#f5f5f5' : '#e3f2fd' }}>
                            <CardContent>
                                <Chip label={n.Type} color="secondary" size="small" sx={{ mb: 1 }} />
                                <Typography variant="h6">{n.Message}</Typography>
                                <Typography color="textSecondary" variant="body2">{new Date(n.Timestamp).toLocaleString()}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}