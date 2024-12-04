import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Button, TextField, Select, MenuItem, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete, Event, PriorityHigh, LowPriority, Star, EventNote, Add } from '@mui/icons-material';

const apiUrl = "http://localhost:8080/api/schedules";

function Schedule() {
  const studentId = localStorage.getItem('studentId'); // Get studentId from local storage
  const [schedules, setSchedules] = useState([]);
  const [toDoItems, setToDoItems] = useState([]);
  const [formData, setFormData] = useState({ title: "", priority: "moderate", startDate: "", endDate: "", colorCode: "", todoListIds: [] });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openToDoDialog, setOpenToDoDialog] = useState(false);
  const [newToDo, setNewToDo] = useState({ title: "", description: "", scheduleId: null });

  useEffect(() => {
    fetchSchedules();
    fetchToDoItems();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getByStudent/${studentId}`); // Fetch schedules by studentId
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules", error);
    }
  };

  const fetchToDoItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/TodoList/getByStudent/" + studentId); // Fetch ToDo items by studentId
      setToDoItems(response.data);
    } catch (error) {
      console.error("Error fetching ToDo items", error);
    }
  };

  const groupedSchedules = {
    high: schedules.filter(schedule => schedule.priority === 'high'),
    moderate: schedules.filter(schedule => schedule.priority === 'moderate'),
    low: schedules.filter(schedule => schedule.priority === 'low'),
  };

  const addOrUpdateSchedule = async () => {
    const today = new Date().toISOString().split('T')[0];
    if (formData.startDate < today) {
        alert("Start date cannot be in the past. Please select today or a future date.");
        return;
    }
    try {
      const url = isEditMode ? `${apiUrl}/editSched/${selectedId}` : `${apiUrl}/postSched`;
      const method = isEditMode ? "put" : "post";

      const scheduleData = { ...formData, studentId: parseInt(studentId, 10) }; // Include studentId

      await axios({ method, url, data: scheduleData, headers: { "Content-Type": "application/json" } });
      setFormData({ title: "", priority: "moderate", startDate: "", endDate: "", colorCode: "", todoListIds: [] });
      setIsEditMode(false);
      setSelectedId(null);
      fetchSchedules();
    } catch (error) {
      console.error("Error saving schedule", error);
    }
  };

  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`${apiUrl}/deleteSched/${id}`);
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule", error);
    }
  };

  const handleEdit = (schedule) => {
    setFormData({
      title: schedule.title,
      priority: schedule.priority,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      colorCode: schedule.colorCode,
      todoListIds: schedule.tasks.map(task => task.toDoListID)
    });
    setIsEditMode(true);
    setSelectedId(schedule.scheduleID);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNewToDoChange = (e) => {
    setNewToDo({ ...newToDo, [e.target.name]: e.target.value });
  };

  const addNewToDo = async () => {
    try {
      const newToDoData = { ...newToDo, studentId: parseInt(studentId, 10) }; // Include studentId
      const response = await axios.post("http://localhost:8080/api/TodoList/postListRecord", { ...newToDoData, scheduleId: selectedId });
      setNewToDo({ title: "", description: "" });
      setOpenToDoDialog(false);
      fetchToDoItems();
    } catch (error) {
      console.error("Error adding ToDo item", error);
    }
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
        return <Event />;
    }
  };

  return (
    <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: 'url(/ASSETS/polkadot.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1000px', textAlign: 'left', mb: 4, p: 3, backgroundColor: '#f9f9f9', borderRadius: '12px', boxShadow: 3 }}>
        <Typography variant="h5" sx={{ color: '#073B4C', mb: 2 }}>SCHEDULE MANAGER</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField label="Title" name="title" value={formData.title} onChange={handleFormChange} fullWidth />
          <TextField label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleFormChange} InputLabelProps={{ shrink: true }} />
          <TextField label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleFormChange} InputLabelProps={{ shrink: true }} />
          <Select name="priority" value={formData.priority} onChange={handleFormChange}>
            <MenuItem value="high">HIGH</MenuItem>
            <MenuItem value="moderate">MODERATE</MenuItem>
            <MenuItem value="low">LOW</MenuItem>
          </Select>
          <Select name="colorCode" value={formData.colorCode} onChange={handleFormChange}>
            <MenuItem value="#EF476F" style={{ color: "#EF476F" }}>Pink</MenuItem>
            <MenuItem value="#06D6A0" style={{ color: "#06D6A0" }}>Green</MenuItem>
            <MenuItem value="#118AB2" style={{ color: "#118AB2" }}>Blue</MenuItem>
            <MenuItem value="#F78C6B" style={{ color: "#F78C6B" }}>Coral</MenuItem>
            <MenuItem value="#FFD166" style={{ color: "#FFD166" }}>Yellow</MenuItem>
            <MenuItem value="#073B4C" style={{ color: "#073B4C" }}>Dark Blue</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={() => setOpenToDoDialog(true)} startIcon={<Add />}>
            Add ToDo
          </Button>
          <Button variant="contained" color={isEditMode ? "secondary" : "primary"} onClick={addOrUpdateSchedule} sx={{ backgroundColor: isEditMode ? '#ffadad' : '#ffcb77', borderRadius: '20px' }}>
            {isEditMode ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>

      <Dialog open={openToDoDialog} onClose={() => setOpenToDoDialog(false)}>
        <DialogTitle>Add ToDo Item</DialogTitle>
        <DialogContent>
          <TextField label="Title" name="title" value={newToDo.title} onChange={handleNewToDoChange} fullWidth />
          <TextField label="Description" name="description" value={newToDo.description} onChange={handleNewToDoChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenToDoDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={addNewToDo} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ width: '100%', maxWidth: '1000px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: 3, overflow: 'hidden', p: 3, mb: 4 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,dayGridDay,listWeek'
          }}
          events={schedules.map((s) => ({
            title: s.title,
            start: s.startDate,
            end: s.endDate || s.startDate,
            backgroundColor: s.colorCode,
          }))}
          height="600px"
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            list: 'List'
          }}
        />
      </Box>
      <Box sx={{ width: '100%', maxWidth: '1000px', p: 3, borderRadius: '12px', boxShadow: 3, mb: 4, display: 'flex', gap: 2 }}>
        {Object.keys(groupedSchedules).map((priority, index) => (
          <Box key={index} sx={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: priority === 'high' ? '#EF476F' : priority === 'moderate' ? '#FFD166' : '#06D6A0', textAlign: 'center' }}>
              {priority.toUpperCase()} PRIORITY
            </Typography>
            {groupedSchedules[priority].map(schedule => (
              <Box key={schedule.scheduleID} sx={{ backgroundColor: schedule.colorCode, borderRadius: '15px', padding: '16px', mb: 3, color: '#ffffff', boxShadow: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>{getPriorityIcon(schedule.priority)} {schedule.title}</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff' }}><EventNote /> {schedule.startDate} {schedule.endDate && `- ${schedule.endDate}`}</Typography>
                <Box sx={{ display: 'flex', gap: '1', mt: 2 }}>
                  <Button variant="contained" startIcon={<Add />} onClick={() => setOpenToDoDialog(true)} sx={{ backgroundColor: '#A5D6A7', color: '#fff', borderRadius: '20px' }}>Add ToDo</Button>
                  <Button variant="contained" startIcon={<Edit />} onClick={() => handleEdit(schedule)} sx={{ backgroundColor: '#A5D6A7', color: '#fff', borderRadius: '20px' }}>Edit</Button>
                  <Button variant="contained" startIcon={<Delete />} color="error" onClick={() => deleteSchedule(schedule.scheduleID)} sx={{ borderRadius: '20px' }}>Delete</Button>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Schedule;