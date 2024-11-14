// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { Dashboard as DashboardIcon, Folder, CheckCircle, CalendarToday, Timer, Settings } from '@mui/icons-material';
import Dashboard from './Dashboard';
import Schedule from './Schedule';
import FolderApp from './FolderApp'; // Import FolderApp
import NoteApp from './NoteApp'; // Import NoteApp
import TimerSetup from './Timer/TimerSetup'; // Three timer callouts
import TimerRunning from './Timer/TimerRunning';
import TimerList from './Timer/TimerList'; 
import ToDoList from './ToDoList';

// Define theme colors
const themeColors = {
  primary: "#EF476F",
  secondary: "#F78C6B",
  accent: "#FFD166",
  green: "#06D6A0",
  blue: "#118AB2",
  dark: "#073B4C"
};

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            '& .MuiDrawer-paper': { width: 240, backgroundColor: '#fff', color: '#000' },
          }}
        >
          <Box p={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
            <img src="/logo.png" alt="Logo" width="100%" />
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{ backgroundColor: '#fff', borderRadius: '4px', width: '90%' }}
            />
          </Box>
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon><DashboardIcon style={{ color: themeColors.primary }} /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/folders">
              <ListItemIcon><Folder style={{ color: themeColors.secondary }} /></ListItemIcon>
              <ListItemText primary="Folders" />
            </ListItem>
            <ListItem button component={Link} to="/todo">
              <ListItemIcon><CheckCircle style={{ color: themeColors.accent }} /></ListItemIcon>
              <ListItemText primary="To-Do" />
            </ListItem>
            <ListItem button component={Link} to="/calendar">
              <ListItemIcon><CalendarToday style={{ color: themeColors.green }} /></ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItem>
            <ListItem button component={Link} to="/timer">
              <ListItemIcon><Timer style={{ color: themeColors.blue }} /></ListItemIcon>
              <ListItemText primary="Timer" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
              <ListItemIcon><Settings style={{ color: themeColors.dark }} /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button component={Link} to="/notes"> {/* Add Link to NoteApp */}
              <ListItemIcon><CheckCircle style={{ color: themeColors.accent }} /></ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f0f0' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect root to dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Schedule />} />
            <Route path="/folders" element={<FolderApp />} />
            <Route path="/todo" element={<ToDoList />} />
            <Route path="/notes" element={<NoteApp />} /> {/* Add route for NoteApp */}
            <Route path="/timer" element={<TimerSetup />} />
            <Route path="/running" element={<TimerRunning />} />
            <Route path="/list" element={<TimerList />} /> {/* Add route for Timers */}
            {/* Add other routes here */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
