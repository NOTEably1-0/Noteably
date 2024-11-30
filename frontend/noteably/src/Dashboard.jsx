import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API requests
import { Box, Grid, Typography, Paper } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import FolderIcon from '@mui/icons-material/Folder';
import Calendar from './Calendar'; // Import Calendar component
import { API_ENDPOINTS, axiosConfig } from './config/api'; // Import API config

// Define theme colors
const themeColors = {
  primary: "#EF476F",
  secondary: "#F78C6B",
  accent: "#FFD166",
  green: "#06D6A0",
  blue: "#118AB2",
  dark: "#073B4C",
};

function Dashboard() {
  const [studentData, setStudentData] = useState({ studentId: '', studentName: '' });

  useEffect(() => {
    const fetchStudentData = async () => {
      // Retrieve the student ID from localStorage
      const studentId = localStorage.getItem('studentId');
  
      if (!studentId) {
        console.error("No student ID found in localStorage.");
        return;
      }
  
      try {
        const response = await axios.get(API_ENDPOINTS.STUDENT.GET_BY_ID(studentId), axiosConfig);
        console.log('API Response:', response.data);  // Log the response for debugging
  
        // Destructure the correct values from the response data
        const { studentId: apiStudentId, name } = response.data; // Ensure correct names are used here
        setStudentData({ studentId: apiStudentId, studentName: name }); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching student data:', error.response?.data || error.message);
      }
    };
  
    fetchStudentData();
  }, []);
  

  return (
    <Box
      sx={{
        backgroundImage: 'url(/ASSETS/polkadot.png)', // Path to background image in the public folder
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: 3,
      }}
    >
      {/* Header Section */}
      <Typography variant="h4" sx={{ color: themeColors.primary, mb: 1 }}>
        Hello, {studentData.studentName || 'Student'}!
      </Typography>
      <Typography variant="subtitle1" sx={{ color: themeColors.secondary, mb: 2 }}>
        Student ID: {studentData.studentId || 'Unknown ID'}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: themeColors.secondary, mb: 4 }}>
        Stay organized, stay ahead!
      </Typography>

      {/* Grid Layout for Widgets */}
      <Grid container spacing={3}>
        {/* To-Do List Widget */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#ffffff' }}>
            <Typography variant="h6" sx={{ color: themeColors.accent }}>To-Do List</Typography>
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
                padding: 2,
              }}
            >
              <TimerIcon sx={{ fontSize: 50, color: themeColors.blue }} />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Countdown Timer Here!
              </Typography>
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
                padding: 2,
              }}
            >
              <FolderIcon sx={{ fontSize: 50, color: themeColors.dark }} />
              <Typography variant="body1" sx={{ mt: 1 }}>
                Manage Your Files
              </Typography>
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