import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>
        <Button color="inherit" component={Link} to="/">All</Button>
        <Button color="inherit" component={Link} to="/priority">Priority Inbox</Button>
      </Toolbar>
    </AppBar>
  );
}