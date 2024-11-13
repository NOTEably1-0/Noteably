// Dashboard.jsx
import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, Card, CardContent } from '@mui/material';
import Calendar from './Calendar'; // Import Calendar component
import TimerIcon from '@mui/icons-material/Timer';
import FolderIcon from '@mui/icons-material/Folder';

// Define theme colors
const themeColors = {
  primary: "#EF476F",
  secondary: "#F78C6B",
  accent: "#FFD166",
  green: "#06D6A0",
  blue: "#118AB2",
  dark: "#073B4C"
};

// Dummy data for the dashboard
const userName = "Username";
const motto = "Stay organized, stay ahead!";

function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete project report", completed: false },
    { id: 2, title: "Schedule team meeting", completed: true }
  ]);

  return (
    <Box
      sx={{
        backgroundImage: 'url(/polkadots.png)', // Path to background image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: 3
      }}
    >
      <Typography variant="h4" sx={{ color: themeColors.primary, mb: 1 }}>
        Hello, {userName}!
      </Typography>
      <Typography variant="subtitle1" sx={{ color: themeColors.secondary, mb: 4 }}>
        {motto}
      </Typography>
      
      {/* Grid Layout for Widgets */}
      <Grid container spacing={3}>
        {/* To-Do List Widget */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#ffffff' }}>
            <Typography variant="h6" sx={{ color: themeColors.accent }}>To-Do List</Typography>
            {tasks.map(task => (
              <Card
                key={task.id}
                sx={{
                  mb: 1,
                  p: 1,
                  backgroundColor: task.completed ? themeColors.green : themeColors.primary,
                  color: '#ffffff'
                }}
              >
                <CardContent>
                  <Typography>{task.title}</Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Timer Widget */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#ffffff' }}>
            <Typography variant="h6" sx={{ color: themeColors.blue }}>Timer</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2
              }}
            >
              <TimerIcon sx={{ fontSize: 50, color: themeColors.blue }} />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Countdown Timer Here!
              </Typography>
              {/* Placeholder for Timer component logic */}
            </Box>
          </Paper>
        </Grid>

        {/* Folders Widget */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#ffffff' }}>
            <Typography variant="h6" sx={{ color: themeColors.dark }}>Folders</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2
              }}
            >
              <FolderIcon sx={{ fontSize: 50, color: themeColors.dark }} />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Manage Your Files
              </Typography>
              {/* Placeholder for Folder management logic */}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Calendar Widget */}
      <Grid item xs={12} sx={{ mt: 3 }}>
        <Paper elevation={3} sx={{ p: 2, backgroundColor: '#ffffff' }}>
          <Typography variant="h6" sx={{ color: themeColors.green }}>Calendar</Typography>
          <Calendar /> {/* Integrating Calendar component */}
        </Paper>
      </Grid>
    </Box>
  );
}

export default Dashboard;
