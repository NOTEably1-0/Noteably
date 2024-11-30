import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { Edit, Delete, PriorityHigh, LowPriority, Star, EventNote } from '@mui/icons-material';

const apiUrl = "http://localhost:8080/api/schedule";

function Calendar() {
  const [schedules, setSchedules] = useState([]);
  
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${apiUrl}/all`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules", error);
    }
  };

  const groupedSchedules = {
    high: schedules.filter(schedule => schedule.priority === 'high'),
    moderate: schedules.filter(schedule => schedule.priority === 'moderate'),
    low: schedules.filter(schedule => schedule.priority === 'low'),
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <PriorityHigh sx={{ color: '#FF6F61' }} />;
      case 'moderate':
        return <Star sx={{ color: '#FFD166' }} />;
      case 'low':
        return <LowPriority sx={{ color: '#FFC067' }} />;
      default:
        return <EventNote />;
    }
  };

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: '1000px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: 3, p: 3, mb: 4 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          events={schedules.map((s) => ({
            title: s.title,
            start: s.startDate,
            end: s.endDate || s.startDate,
            color: s.colorCode,
          }))}
          height="600px"
        />
      </Box>

      <Typography variant="h6" sx={{ mb: 3, color: '#4A90E2' }}>PRIORITY SCHEDULES</Typography>
      <Box sx={{ width: '100%', maxWidth: '1000px', display: 'flex', gap: 2 }}>
        {Object.keys(groupedSchedules).map((priority, index) => (
          <Box key={index} sx={{ flex: 1, backgroundColor: '#f4f4f4', borderRadius: '12px', padding: '16px', boxShadow: 3 }}>
            <Typography variant="h6" sx={{
              mb: 2, textAlign: 'center', color: priority === 'high' ? '#EF476F' : priority === 'moderate' ? '#FFD166' : '#06D6A0'
            }}>
              {priority.toUpperCase()} PRIORITY
            </Typography>
            {groupedSchedules[priority].map(schedule => (
              <Box key={schedule.scheduleID} sx={{ backgroundColor: schedule.colorCode, borderRadius: '15px', padding: '16px', mb: 3, color: '#ffffff', boxShadow: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>{getPriorityIcon(schedule.priority)} {schedule.title}</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff' }}><EventNote /> {schedule.startDate} {schedule.endDate && `- ${schedule.endDate}`}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button variant="contained" startIcon={<Edit />} sx={{ backgroundColor: '#A5D6A7', color: '#fff', borderRadius: '20px' }}>Edit</Button>
                  <Button variant="contained" startIcon={<Delete />} color="error" sx={{ borderRadius: '20px' }}>Delete</Button>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Calendar;
