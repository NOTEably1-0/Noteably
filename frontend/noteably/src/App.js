import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { Dashboard as DashboardIcon, Folder, CheckCircle, CalendarToday, Timer, Settings as SettingsIcon } from '@mui/icons-material';
import Dashboard from './Dashboard';
import Schedule from './Schedule';
import FolderApp from './FolderApp';
import NoteApp from './NoteApp';
import TimerSetup from './Timer/TimerSetup';
import TimerRunning from './Timer/TimerRunning';
import ToDoList from './ToDoList';
import Login from './Login';
import Register from './Register';
import LandingPage from './LandingPage';
import SettingsPage from './Settings';

function App() {
  const location = useLocation();
  const isFullScreenPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  React.useEffect(() => {
    document.querySelector('link[rel="icon"]').href = '/ASSETS/noteably_logo.png'; // Set favicon
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {!isFullScreenPage && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            '& .MuiDrawer-paper': { width: 240, backgroundColor: '#fff', color: '#000' },
          }}
        >
          <Box p={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
            <img src="/ASSETS/noteably_logo.png" alt="Logo" width="100%" />
          </Box>
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/folders">
              <ListItemIcon><Folder /></ListItemIcon>
              <ListItemText primary="Folders" />
            </ListItem>
          </List>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
