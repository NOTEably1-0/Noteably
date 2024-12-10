import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Folder, Timer as TimerIcon, Assignment as ToDoIcon, Event as CalendarIcon, Settings, CheckCircle } from '@mui/icons-material';
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
import SettingsPage from './Setting';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Define theme colors
const themeColors = {
  primary: "#EF476F",
  secondary: "#F78C6B",
  accent: "#FFD166",
  green: "#06D6A0",
  blue: "#118AB2",
  dark: "#073B4C"
};

// Component to render the sidebar item with dynamic active state
function SidebarItem({ to, icon, text, color }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ListItem
      button={true}
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
  const location = useLocation();
  const isFullScreenPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  React.useEffect(() => {
    document.querySelector('link[rel="icon"]').href = '/ASSETS/noteably_logo.png';
  }, []);

  return (
    <AuthProvider>
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
              <SidebarItem to="/dashboard" icon={<DashboardIcon />} text="Dashboard" color={themeColors.primary} />
              <SidebarItem to="/folders" icon={<Folder />} text="Folders" color={themeColors.secondary} />
              <SidebarItem to="/todo" icon={<ToDoIcon />} text="To-Do List" color={themeColors.accent} />
              <SidebarItem to="/schedule" icon={<CalendarIcon />} text="Schedule" color={themeColors.green} />
              <SidebarItem to="/timer" icon={<TimerIcon />} text="Timer" color={themeColors.blue} />
              <SidebarItem to="/settings" icon={<Settings />} text="Settings" color={themeColors.dark} />
            </List>
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f0f0' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/folders" element={<PrivateRoute element={<FolderApp />} />} />
            <Route path="/notes" element={<PrivateRoute element={<NoteApp />} />} />
            <Route path="/schedule" element={<PrivateRoute element={<Schedule />} />} />
            <Route path="/timer" element={<PrivateRoute element={<TimerSetup />} />} />
            <Route path="/running" element={<PrivateRoute element={<TimerRunning />} />} />
            <Route path="/todo" element={<PrivateRoute element={<ToDoList />} />} />
            <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} />} />
            <Route path="/noteApp/:folderId" element={<PrivateRoute element={<NoteApp />} />} />
          </Routes>
        </Box>
      </Box>
    </AuthProvider>
  );
}

export default App;