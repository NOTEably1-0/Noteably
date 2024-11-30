import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Folder, Timer as TimerIcon, Assignment as ToDoIcon, Event as CalendarIcon } from '@mui/icons-material';
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
import Setting from './Setting';

function App() {
  const location = useLocation();
  const isFullScreenPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  React.useEffect(() => {
    document.querySelector('link[rel="icon"]').href = '/ASSETS/noteably_logo.png';
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
            <ListItem button component={Link} to="/timer">
              <ListItemIcon><TimerIcon /></ListItemIcon>
              <ListItemText primary="Timer" />
            </ListItem>
            <ListItem button component={Link} to="/todo">
              <ListItemIcon><ToDoIcon /></ListItemIcon>
              <ListItemText primary="To-Do List" />
            </ListItem>
            <ListItem button component={Link} to="/schedule">
              <ListItemIcon><CalendarIcon /></ListItemIcon>
              <ListItemText primary="Schedule" />
            </ListItem>
          </List>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/folders" element={<FolderApp />} />
          <Route path="/notes" element={<NoteApp />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/timer" element={<TimerSetup />} />
          <Route path="/running" element={<TimerRunning />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
