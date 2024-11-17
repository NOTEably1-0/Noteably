import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { Dashboard as DashboardIcon, Folder, CheckCircle, CalendarToday, Timer, Settings } from '@mui/icons-material';
import Dashboard from './Dashboard';
import Schedule from './Schedule';
import FolderApp from './FolderApp';
import NoteApp from './NoteApp';
import TimerSetup from './Timer/TimerSetup';
import TimerRunning from './Timer/TimerRunning';
import TimerList from './Timer/TimerList';
import ToDoList from './ToDoList';
import Login from './Login';
import Register from './Register';
import LandingPage from './LandingPage';

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
  const location = useLocation();
  const isFullScreenPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Conditionally render the sidebar */}
      {!isFullScreenPage && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            '& .MuiDrawer-paper': { width: 240, backgroundColor: '#fff', color: '#000' },
          }}
        >
          <Box p={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
            <img src="/noteably_logo.png" alt="Logo" width="100%" />
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
            <ListItem button component={Link} to="/notes">
              <ListItemIcon><CheckCircle style={{ color: themeColors.accent }} /></ListItemIcon>
              <ListItemText primary="Notes" />
            </ListItem>
          </List>
        </Drawer>
      )}

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f0f0', width: isFullScreenPage ? '100%' : 'calc(100% - 240px)' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Set LandingPage as the default route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Schedule />} />
          <Route path="/folders" element={<FolderApp />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/notes" element={<NoteApp />} />
          <Route path="/timer" element={<TimerSetup />} />
          <Route path="/running" element={<TimerRunning />} />
          <Route path="/list" element={<TimerList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </Box>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;