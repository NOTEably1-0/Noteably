import React, { useEffect, useState, useRef } from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import ListIcon from '@mui/icons-material/List';
import { useNavigate, useLocation } from 'react-router-dom';

function TimerRunning() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, initialTime = 0 } = location.state || { title: 'No Title', initialTime: 0 };

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef(new Audio('/TimerSound.mp3'));

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      audioRef.current.play();
    }
  }, [timeLeft, isPaused]);

  useEffect(() => {
    return () => {
<<<<<<< HEAD:frontend/src/Timer/TimerRunning.jsx
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.load();
      }
=======
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
>>>>>>> parent of c4fd8db (Merge branch 'main' of https://github.com/NOTEably1-0/Noteably):frontend/noteably/src/Timer/TimerRunning.jsx
    };
  }, []);

  const handlePausePlay = () => {
    setIsPaused(prev => !prev);
    stopAudio();
  };

  const handleReset = () => {
    stopAudio();
    navigate('/timer');
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const formatTime = totalSeconds => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Centered container styles with polkadot background
  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    backgroundImage: `url('/polkadot.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '30px',
    border: '1px solid lightgray',
  };

  // Inner box with requested styles
  const contentBoxStyles = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '30px',
    boxShadow: 'inset 0 2px 2px rgba(0, 0, 0, 0.1)',
    border: '1px solid lightgray',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
  };

  return (
    <Box sx={containerStyles}>
      <Box sx={contentBoxStyles}>
        <Typography variant="h4" sx={{ marginBottom: '10px' }}>{title}</Typography>
        <Typography variant="subtitle1" sx={{ color: '#666' }}>
          {`${Math.floor(initialTime / 3600)}h ${Math.floor((initialTime % 3600) / 60)}m ${initialTime % 60}s`}
        </Typography>

        {/* Circle and remaining time */}
        <Box sx={{ position: 'relative', width: '350px', height: '350px', margin: '20px auto' }}>
          <Box sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(from 90deg, #EF476F, #F78C6B, #FFD166, #06D6A0, #118AB2 ${(timeLeft / initialTime) * 360}deg, transparent ${(timeLeft / initialTime) * 360}deg)`,
            mask: `radial-gradient(farthest-side, transparent calc(100% - 25px), black calc(100% - 25px)) content-box`,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }} />

          <Typography variant="h3" sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: timeLeft === 0 ? '#EF476F' : undefined,
            zIndex: 3,
          }}>
            {timeLeft === 0 ? "Time's Up" : formatTime(timeLeft)}
          </Typography>
        </Box>

        {/* Control buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <IconButton onClick={() => { navigate('/list'); stopAudio(); }} sx={{ backgroundColor: '#FFD166', color: 'white', minWidth: '50px', minHeight: '50px', borderRadius: '50%' }}>
            <ListIcon />
          </IconButton>

          <IconButton
            onClick={handlePausePlay}
            disabled={timeLeft === 0}
            sx={{
              backgroundColor: timeLeft === 0 ? '#cccccc' : '#06D6A0',
              color: 'white',
              minWidth: '50px',
              minHeight: '50px',
              borderRadius: '50%',
              cursor: timeLeft === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>

          <IconButton onClick={handleReset} sx={{ backgroundColor: '#EF476F', color: 'white', minWidth: '50px', minHeight: '50px', borderRadius: '50%' }}>
            <StopIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default TimerRunning;
