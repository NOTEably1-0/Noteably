import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ListIcon from '@mui/icons-material/List';
import RefreshIcon from '@mui/icons-material/Refresh';
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
  const navigate = useNavigate();

  // Fetch timers from backend
  const fetchTimers = async () => {
    try {
      const response = await axios.get(`${url}/getAll`);
      setTimerList(response.data);
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  // Add timer
  const addTimer = async (title, hours, minutes, seconds) => {
    const newTimer = { title, hours, minutes, seconds };
    try {
      const response = await axios.post(`${url}/create`, newTimer);
      setTimerList([...timerList, response.data]);
    } catch (error) {
      console.error("Error adding timer:", error);
    }
  };

  // Delete timer
  const deleteTimer = async (timerID) => {
    try {
      await axios.delete(`${url}/delete/${timerID}`);
      setTimerList(timerList.filter((timer) => timer.timerID !== timerID));
    } catch (error) {
      console.error("Error deleting timer:", error);
    }
  };

  // Update timer
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

  const handleListNavigation = () => {
    navigate('/list');
  };

  const isStartDisabled = 
    (!/^\d+$/.test(hours) || hours === '00' || hours === '') && 
    (!/^\d+$/.test(minutes) || minutes === '00' || minutes === '') && 
    (!/^\d+$/.test(seconds) || seconds === '00' || seconds === '');

  // Fetch timers on initial load
  useEffect(() => {
    fetchTimers();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
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
      <Box
        sx={{
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid lightgray', // Border for the outer container
          borderRadius: '30px',
          width: '90%',
          maxWidth: '500px',
          textAlign: 'center',
          boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.2)', // Inner shadow effect
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ color: '#EF476F', textAlign: 'center' }}>Hours</Typography>
            <TextField
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 2 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: '#EF476F',
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: '#EF476F' },
                },
                width: '80px'
              }}
            />
          </Grid>

          <Grid item>
            <Typography variant="h6" style={{ color: '#FFD166', textAlign: 'center' }}>Minutes</Typography>
            <TextField
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 2 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: '#FFD166',
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: '#FFD166' },
                },
                width: '80px'
              }}
            />
          </Grid>

          <Grid item>
            <Typography variant="h6" style={{ color: '#118AB2', textAlign: 'center' }}>Seconds</Typography>
            <TextField
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              variant="outlined"
              inputProps={{ maxLength: 2 }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderColor: '#118AB2',
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: '#118AB2' },
                },
                width: '80px'
              }}
            />
          </Grid>
        </Grid>

        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Timer Title"
          variant="outlined"
          inputProps={{ maxLength: 20 }}
          sx={{
            "& .MuiOutlinedInput-root": {
                  borderColor: '#118AB2',
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: '#06D6A0' },
                },
                marginTop: '20px', width: '38%' }}
        />

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button 
            variant="contained" 
            onClick={handleListNavigation}
            sx={{ backgroundColor: '#FFD166', color: 'white', minWidth: '50px', minHeight: '50px', borderRadius: '50%' }}
          >
            <ListIcon />
          </Button>
          
          <Button 
            variant="contained" 
            onClick={handleStart} 
            disabled={isStartDisabled}
            sx={{ backgroundColor: '#06D6A0', color: 'white', minWidth: '50px', minHeight: '50px', borderRadius: '50%' }}
          >
            <PlayArrowIcon />
          </Button>
          
          <Button 
            variant="contained" 
            onClick={resetFields}
            sx={{ backgroundColor: '#EF476F', color: 'white', minWidth: '50px', minHeight: '55px', borderRadius: '50%' }}
          >
            <RefreshIcon />
          </Button>
        </div>
      </Box>
    </Box>
  );
}

export default TimerSetup;
