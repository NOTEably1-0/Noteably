import React, { useState, useEffect } from 'react';
import {
    Button,TextField,Typography,Grid,Box,List,ListItem,ListItemText,IconButton,Dialog,DialogTitle,DialogContent,DialogActions,
  } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TimerSetup() {
  const url = "http://localhost:8080/api/timer";
  const [timerList, setTimerList] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [timerToDelete, setTimerToDelete] = useState(null);
  const [timerToEdit, setTimerToEdit] = useState(null);
  const [title, setTitle] = useState('');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');

  // CRUD
  const fetchTimers = async () => {
    try {
        const response = await axios.get(`${url}/getByStudent/${studentId}`);
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
      studentId: parseInt(studentId, 10)
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

  const updateTimer = async () => {
    if (timerToEdit) {
        const updatedTimer = {
            timerID: timerToEdit.timerID,
            title,
            hours: parseInt(hours || '0', 10),
            minutes: parseInt(minutes || '0', 10),
            seconds: parseInt(seconds || '0', 10),
            studentId: parseInt(studentId, 10)
        };
        try {
            const response = await axios.put(`${url}/update/${timerToEdit.timerID}`, updatedTimer);
            setTimerList(timerList.map((timer) => 
                timer.timerID === timerToEdit.timerID ? response.data : timer
            ));
            setEditDialogOpen(false);
        } catch (error) {
            console.error("Error updating timer:", error);
        }
    }
};
  const handlePlayClick = (timer) => {
    const totalSeconds =
      timer.hours * 3600 + timer.minutes * 60 + timer.seconds;
  
    navigate('/running', {
      state: {
        title: timer.title,
        initialTime: totalSeconds,
      },
    });
  };

  const handleEditClick = (timer) => {
    setTimerToEdit(timer);
    setTitle(timer.title);
    setHours(timer.hours);
    setMinutes(timer.minutes);
    setSeconds(timer.seconds);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (timerID) => {
    setTimerToDelete(timerID);
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (timerToDelete) {
      deleteTimer(timerToDelete);
    }
    setConfirmDialogOpen(false);
    setTimerToDelete(null);
  };

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
    setTimerToDelete(null);
  };

  const resetFields = () => {
    setTitle('');
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  };

  const handleStart = () => {
    const totalSeconds =
      parseInt(hours || '0', 10) * 3600 +
      parseInt(minutes || '0', 10) * 60 +
      parseInt(seconds || '0', 10);

    if (totalSeconds > 0) {
      addTimer(title, hours, minutes, seconds);
      navigate('/running', { state: { title, initialTime: totalSeconds } });
    } else {
      alert('Please enter a valid time.');
    }
  };

  useEffect(() => {
    fetchTimers();
  }, []);

  const isStartDisabled =
    (!/^\d+$/.test(hours) || hours === '00' || hours === '0' || hours === '') &&
    (!/^\d+$/.test(minutes) || minutes === '00' || minutes === '0' || minutes === '') &&
    (!/^\d+$/.test(seconds) || seconds === '00' || seconds === '0' || seconds === '');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: '1px solid lightgray',
        borderRadius: '30px',
        padding: '20px',
        backgroundImage: 'url("/ASSETS/polkadot.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Grid container spacing={3} sx={{ width: '90%', height: '100%' }}>
        {/* Timer Setup */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: '20px',
              borderRadius: '30px',
              backgroundColor: 'white',
              border: '1px solid lightgray',
              boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.1)',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minHeight: '500px',
              maxHeight: 'calc(100vh - 100px)',
              maxWidth: '500px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Typography variant="h5" textAlign="center" marginBottom="100px">
              Timer Setup
            </Typography>

            {/* Timer Title */}
            <Grid item sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" style={{ color: '#118AB2', marginBottom: '10px' }}>
                Timer Title
              </Typography>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: 20 }}
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
              backgroundColor: 'white',
              border: '1px solid lightgray',
              boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.1)',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minHeight: '500px',
              maxHeight: 'calc(100vh - 100px)',
              maxWidth: '500px',
              width: '100%',
              boxSizing: 'border-box',
              '&::-webkit-scrollbar': {
                width: '1px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#D3D3D3',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#6A6A6A',
              },
            }}
          >
            <Typography variant="h5" textAlign="center" marginBottom="25px">
              Timer List
            </Typography>
            <List>
              {timerList.map((timer, index) => (
                <ListItem
                  key={timer.timerID}
                  sx={{
                    borderRadius: '15px',
                    marginBottom: '15px',
                    padding: '15px',
                    backgroundColor: ['#EF476F', '#F78C6B', '#FFD166', '#06D6A0', '#118AB2'][index % 5],
                    color: 'white',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <ListItemText
                    primary={timer.title}
                    secondary={`${timer.hours}h ${timer.minutes}m ${timer.seconds}s`}
                    primaryTypographyProps={{ style: { color: 'white', fontWeight: 'bold' } }}
                    secondaryTypographyProps={{ style: { color: 'white' } }}
                  />
                  <IconButton onClick={() => handleEditClick(timer)} sx={{ color: 'white' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(timer.timerID)} sx={{ color: 'white' }}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handlePlayClick(timer)} sx={{ color: 'white' }}>
                    <PlayArrowIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Edit Dialog */}
          <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <DialogTitle>Edit Timer</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: 20 }}
                sx={{ marginBottom: '10px', marginTop: '10px' }}
              />
              <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                  <TextField
                    label="Hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    inputProps={{ maxLength: 2 }}
                    style={{ width: '100px' }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    inputProps={{ maxLength: 2 }}
                    style={{ width: '100px' }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Seconds"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    inputProps={{ maxLength: 2 }}
                    style={{ width: '100px' }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={updateTimer} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Confirm Delete Dialog */}
          <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogActions>
              <Button onClick={handleDeleteCancel} style={{ color: '#118AB2' }}>
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} style={{ color: '#EF476F' }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TimerSetup;