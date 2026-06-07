import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../api';
import { Container, Card, CardContent, Typography, Button, Grid, Chip } from '@mui/material';

export default function AllNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [readIds, setReadIds] = useState(() => JSON.parse(localStorage.getItem('readNotifs')) || []);

    useEffect(() => {
        fetchNotifications().then(setNotifications).catch(console.error);
    }, []);

    const markAsRead = (id) => {
        const updated = [...readIds, id];
        setReadIds(updated);
        localStorage.setItem('readNotifs', JSON.stringify(updated));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>All Notifications</Typography>
            <Grid container spacing={2}>
                {notifications.map(n => {
                    const isRead = readIds.includes(n.ID);
                    return (
                        <Grid item xs={12} sm={6} md={4} key={n.ID}>
                            <Card sx={{ bgcolor: isRead ? '#f5f5f5' : '#e3f2fd' }}>
                                <CardContent>
                                    <Chip label={n.Type} color="primary" size="small" sx={{ mb: 1 }} />
                                    <Typography variant="h6">{n.Message}</Typography>
                                    <Typography color="textSecondary" variant="body2">{new Date(n.Timestamp).toLocaleString()}</Typography>
                                    {!isRead && (
                                        <Button variant="contained" size="small" sx={{ mt: 2 }} onClick={() => markAsRead(n.ID)}>
                                            Mark as Read
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}