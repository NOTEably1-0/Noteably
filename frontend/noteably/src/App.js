import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import { Dashboard as DashboardIcon, Folder, CheckCircle, CalendarToday, Timer, Settings } from '@mui/icons-material';
import Dashboard from './Dashboard';
import Schedule from './Schedule';
import FolderApp from './FolderApp';
import NoteApp from './NoteApp';
import TimerSetup from './Timer/TimerSetup';
import TimerRunning from './Timer/TimerRunning';
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

// Component to render the sidebar list with active state
function SidebarItem({ to, icon, text, color }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItem
      button
      component={Link}
      to={to}
      sx={{
        backgroundColor: isActive ? color : 'transparent',
        borderRadius: '15px',
        color: isActive ? 'white' : color,
        margin: '5px 10px', // Add horizontal margins to prevent touching the sidebar edges
        padding: '10px 15px', // Add padding for inner spacing
        width: 'calc(100% - 20px)', // Shrink the width slightly to match the margins
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <ListItemIcon sx={{ color: isActive ? 'white' : color }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

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
            <img src="/noteably_logo.png" alt="Logo" width="100%" />
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{ backgroundColor: '#fff', borderRadius: '4px', width: '90%' }}
            />
          </Box>
          <List>
            <SidebarItem to="/dashboard" icon={<DashboardIcon />} text="Dashboard" color={themeColors.primary} />
            <SidebarItem to="/folders" icon={<Folder />} text="Folders" color={themeColors.secondary} />
            <SidebarItem to="/todo" icon={<CheckCircle />} text="To-Do" color={themeColors.accent} />
            <SidebarItem to="/calendar" icon={<CalendarToday />} text="Calendar" color={themeColors.green} />
            <SidebarItem to="/timer" icon={<Timer />} text="Timer" color={themeColors.blue} />
            <SidebarItem to="/settings" icon={<Settings />} text="Settings" color={themeColors.dark} />
            <SidebarItem to="/notes" icon={<CheckCircle />} text="Notes" color={themeColors.accent} />
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f0f0' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Schedule />} />
            <Route path="/folders" element={<FolderApp />} />
            <Route path="/todo" element={<ToDoList />} />
            <Route path="/notes" element={<NoteApp />} />
            <Route path="/timer" element={<TimerSetup />} />
            <Route path="/running" element={<TimerRunning />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;