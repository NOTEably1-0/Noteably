import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Box, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ListIcon from '@mui/icons-material/List';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TimerSetup() {
  const url = "http://localhost:8080/api/timer";
  const [timerList, setTimerList] = useState([]);
  const [activeTimer, setActiveTimer] = useState(null);
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [open, setOpen] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newHours, setNewHours] = useState('');
  const [newMinutes, setNewMinutes] = useState('');
  const [newSeconds, setNewSeconds] = useState('');
  const navigate = useNavigate();

  const fetchTimers = async () => {
    try {
      const response = await axios.get(`${url}/getAll`);
      setTimerList(response.data);
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  const addTimer = async (title, hours, minutes, seconds) => {
    const formattedTimer = {
      title: title.trim(),
      hours: parseInt(hours || '0', 10),
      minutes: parseInt(minutes || '0', 10),
      seconds: parseInt(seconds || '0', 10),
    };
    try {
      const response = await axios.post(`${url}/create`, formattedTimer);
      setTimerList([...timerList, response.data]);
    } catch (error) {
      console.error("Error adding timer:", error);
    }
  };

  const deleteTimer = async (timerID) => {
    try {
      await axios.delete(`${url}/delete/${timerID}`);
      setTimerList(timerList.filter((timer) => timer.timerID !== timerID));
    } catch (error) {
      console.error("Error deleting timer:", error);
    }
  };

  const updateTimer = async (timerID, updatedTimer) => {
    try {
      const response = await axios.put(`${url}/update/${timerID}`, updatedTimer);
      setTimerList(timerList.map((timer) => (timer.timerID === timerID ? response.data : timer)));
    } catch (error) {
      console.error("Error updating timer:", error);
    }
  };

  const resetFields = () => {
    setTitle('');
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  };

  const handleStart = () => {
    const totalSeconds =
      (parseInt(hours || '0', 10) * 3600) +
      (parseInt(minutes || '0', 10) * 60) +
      parseInt(seconds || '0', 10);

    if (totalSeconds > 0) {
      addTimer(title, hours, minutes, seconds);
      navigate('/running', { state: { title, initialTime: totalSeconds } });
    } else {
      alert('Please enter a valid time.');
    }
  };

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
    updateTimer(currentTimer.timerID, updatedTimer);
    setOpen(false);
  };

  const isStartDisabled =
    (!/^\d+$/.test(hours) || hours === '00' || hours === '0' || hours === '') &&
    (!/^\d+$/.test(minutes) || minutes === '00' ||  minutes === '0' || minutes === '') &&
    (!/^\d+$/.test(seconds) || seconds === '00' ||  seconds === '0' || seconds === '');

  useEffect(() => {
    fetchTimers();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '94vh',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
        border: '1px solid lightgray', // Border for the outer container
        borderRadius: '30px', // Rounded corners for outer container
        padding: '20px', // Padding around inner box
        backgroundImage: 'url("/polkadot.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxSizing: 'border-box', // Ensures padding and border don't expand the container
      }}
    >
      <Grid container spacing={3} sx={{ width: '90%', height: '90%' }}>
        {/* Timer Setup */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: '20px',
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid lightgray', // Light gray solid border
              boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.2)', // Shadow for depth
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Typography variant="h5" textAlign="center" marginBottom="85px">
              Timer Setup
            </Typography>

            {/* Timer Title */}
            <Grid item sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" style={{ color: '#118AB2', marginBottom: '10px' }}>
                Timer Title
              </Typography>
              <TextField
                value={title} // Use the state variable `title`
                onChange={(e) => setTitle(e.target.value)} // Update `title` state on change
                placeholder="Enter Timer Title"
                variant="outlined"
                sx={{
                  width: '38%',
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#118AB2',
                  },
                }}
              />
            </Grid>

            {/* Hours, Minutes, and Seconds Inputs */}
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: '10px' }}>
              {/* Hours */}
              <Grid item>
                <Typography variant="h6" style={{ color: '#EF476F' }}>Hours</Typography>
                <TextField
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  inputProps={{ maxLength: 2 }}
                  variant="outlined"
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#EF476F',
                    },
                  }}
                />
              </Grid>

              {/* Minutes */}
              <Grid item>
                <Typography variant="h6" style={{ color: '#FFD166' }}>Minutes</Typography>
                <TextField
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  inputProps={{ maxLength: 2 }}
                  variant="outlined"
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFD166',
                    },
                  }}
                />
              </Grid>

              {/* Seconds */}
              <Grid item>
                <Typography variant="h6" style={{ color: '#06D6A0' }}>Seconds</Typography>
                <TextField
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  inputProps={{ maxLength: 2 }}
                  variant="outlined"
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#06D6A0',
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '20px' }}>
              {/* Start Button */}
              <Grid item>
                <IconButton
                  onClick={handleStart}
                  disabled={isStartDisabled}
                  sx={{
                    backgroundColor: isStartDisabled ? '#CCC' : '#06D6A0',
                    color: '#FFF',
                    width: 55,
                    height: 55,
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: isStartDisabled ? '#CCC' : '#04B58D',
                    },
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: '30px' }} />
                </IconButton>
              </Grid>

              {/* Reset Button */}
              <Grid item>
                <IconButton
                  onClick={resetFields}
                  sx={{
                    backgroundColor: '#EF476F',
                    color: '#FFF',
                    width: 55,
                    height: 55,
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: '#D94262',
                    },
                  }}
                >
                  <RefreshIcon sx={{ fontSize: '30px' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Timer List */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: '20px',
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid lightgray', // Light gray solid border
              boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.2)', // Shadow for depth
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Typography variant="h5" textAlign="center" marginBottom="20px">
              Timer List
            </Typography>
            <List>
              {timerList.map((timer, index) => (
                <ListItem key={timer.timerID}>
                  <ListItemText primary={timer.title} secondary={`${timer.hours}h ${timer.minutes}m ${timer.seconds}s`} />
                  <IconButton onClick={() => handleOpen(timer)}><EditIcon /></IconButton>
                  <IconButton onClick={() => deleteTimer(timer.timerID)}><DeleteIcon /></IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TimerSetup;
