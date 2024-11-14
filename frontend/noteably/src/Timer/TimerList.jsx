import React, { useState, useEffect } from 'react';
import { Button, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const colorPalette = ['#EF476F', '#F78C6B', '#FFD166', '#06D6A0', '#118AB2'];
const ITEMS_PER_PAGE = 5; // Number of timers per page
const url = "http://localhost:8080/api/timer"; // URL for your API

function TimerList({ deleteTimer, updateTimer }) {
  const navigate = useNavigate();
  const [timerList, setTimerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newHours, setNewHours] = useState('');
  const [newMinutes, setNewMinutes] = useState('');
  const [newSeconds, setNewSeconds] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Pagination state

  // Fetch timers from the backend
  const fetchTimers = async () => {
    try {
      const response = await axios.get(`${url}/getAll`);
            setTimerList(response.data); // Populate the timerList with data from the backend
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  useEffect(() => {
    fetchTimers(); // Fetch timers when component mounts
  }, []);

  const handleOpen = (timer) => {
    setCurrentTimer(timer);
    setNewTitle(timer.title);
    setNewHours(timer.hours);
    setNewMinutes(timer.minutes);
    setNewSeconds(timer.seconds);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const updatedTimer = {
      ...currentTimer,
      title: newTitle,
      hours: parseInt(newHours, 10),
      minutes: parseInt(newMinutes, 10),
      seconds: parseInt(newSeconds, 10),
    };
    updateTimer(currentTimer.id, updatedTimer);
    setOpen(false);
  };

  const handleStartTimer = (timer) => {
    const totalSeconds = (parseInt(timer.hours, 10) || 0) * 3600 +
                         (parseInt(timer.minutes, 10) || 0) * 60 +
                         (parseInt(timer.seconds, 10) || 0);
    navigate('/running', { state: { title: timer.title, initialTime: totalSeconds } });
  };

  const handleBack = () => {
    navigate('/');
  };

  // Pagination controls
  const totalPages = Math.ceil(timerList.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentTimers = timerList.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundImage: 'url(/polkadot.png)',
        border: '1px solid lightgray',
        borderRadius: '30px',
        height: '90vh',
        overflow: 'hidden',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="20px">
        <IconButton
          onClick={handleBack}
          sx={{
            backgroundColor: '#EF476F',
            color: 'white',
            width: '40px',
            height: '40px',
            marginRight: '10px',
            '&:hover': { backgroundColor: '#F78C6B' },
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Shadow effect
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ color: 'black' }}>List of Timers</Typography>
        <Box>
          <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
            Previous
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
            Next
          </Button>
        </Box>
      </Box>

      <List>
        {currentTimers.map((timer, index) => (
          <ListItem
            key={timer.id}
            divider
            sx={{
              backgroundColor: colorPalette[(currentPage * ITEMS_PER_PAGE + index) % colorPalette.length],
              borderRadius: '15px',
              marginBottom: '10px',
              padding: '20px',
            }}
          >
            <ListItemText
              primaryTypographyProps={{ style: { color: 'white' } }} // White title
              secondaryTypographyProps={{ style: { color: 'white' } }} // White 0h 0m 0s text
              primary={timer.title}
              secondary={`${timer.hours}h ${timer.minutes}m ${timer.seconds}s`}
              />
            <IconButton onClick={() => handleOpen(timer)} sx={{ color: 'white' }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteTimer(timer.id)} sx={{ color: 'white' }}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleStartTimer(timer)} sx={{ color: 'white' }}>
              <PlayArrowIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Timer</DialogTitle>
        <DialogContent>
          <TextField label="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} fullWidth margin="dense" />
          <TextField label="Hours" value={newHours} onChange={(e) => setNewHours(e.target.value)} fullWidth margin="dense" />
          <TextField label="Minutes" value={newMinutes} onChange={(e) => setNewMinutes(e.target.value)} fullWidth margin="dense" />
          <TextField label="Seconds" value={newSeconds} onChange={(e) => setNewSeconds(e.target.value)} fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TimerList;