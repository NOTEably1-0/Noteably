import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {
  Button, TextField, Select, MenuItem, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

const apiUrl = "http://localhost:8080/api/schedule";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    title: "", priority: "Moderate", startDate: "", endDate: "", colorCode: "", description: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState('');
  const [confirmData, setConfirmData] = useState(null);

  // Fetch schedules on component mount
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

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const url = isEditMode ? `${apiUrl}/update/${selectedId}` : `${apiUrl}/create`;
      const method = isEditMode ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
      });
      // Reset form and state
      setFormData({ title: "", priority: "Moderate", startDate: "", endDate: "", colorCode: "", description: "" });
      setIsEditMode(false);
      setSelectedId(null);
      fetchSchedules();
    } catch (error) {
      console.error("Error saving schedule", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/delete/${id}`);
      fetchSchedules();
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting schedule", error.response?.data || error.message);
    }
  };

  return (
    <div style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage: 'url(/polkadot.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Form Section */}
      <Box sx={{
        width: '100%', maxWidth: '1000px', mb: 4, p: 3,
        backgroundColor: '#f9f9f9', borderRadius: '12px', boxShadow: 3,
      }}>
        <Typography variant="h5" sx={{ color: '#073B4C', mb: 2 }}>Schedule Manager</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField label="Title" name="title" value={formData.title} onChange={handleFormChange} fullWidth />
          <TextField label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleFormChange} InputLabelProps={{ shrink: true }} />
          <TextField label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleFormChange} InputLabelProps={{ shrink: true }} />
          <Select name="priority" value={formData.priority} onChange={handleFormChange}>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
          <Select name="colorCode" value={formData.colorCode} onChange={handleFormChange}>
            <MenuItem value="#EF476F" style={{ color: "#EF476F" }}>Pink</MenuItem>
            <MenuItem value="#06D6A0" style={{ color: "#06D6A0" }}>Green</MenuItem>
            <MenuItem value="#118AB2" style={{ color: "#118AB2" }}>Blue</MenuItem>
            <MenuItem value="#F78C6B" style={{ color: "#F78C6B" }}>Coral</MenuItem>
            <MenuItem value="#FFD166" style={{ color: "#FFD166" }}>Yellow</MenuItem>
            <MenuItem value="#073B4C" style={{ color: "#073B4C" }}>Dark Blue</MenuItem>
          </Select>
          <Button variant="contained" color={isEditMode ? "secondary" : "primary"} onClick={handleSave} sx={{
            backgroundColor: isEditMode ? '#ffadad' : '#ffcb77', borderRadius: '20px',
          }}>
            {isEditMode ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>

      {/* Calendar Section */}
      <Box sx={{ width: '100%', maxWidth: '1000px', mb: 4 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          events={schedules.map((s) => ({
            title: s.title,
            start: s.startDate,
            end: s.endDate || s.startDate,
            backgroundColor: s.colorCode,
          }))}
          height="600px"
        />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>
          {confirmType === 'delete' ? 'Delete Confirmation' : 'Update Confirmation'}
        </DialogTitle>
        <DialogContent>
          {confirmType === 'delete'
            ? 'Are you sure you want to delete this schedule?'
            : 'Are you sure you want to update this schedule?'}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button onClick={() => {
            confirmType === 'delete'
              ? handleDelete(confirmData.id)
              : handleSave();
            setShowConfirm(false);
          }} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Schedule;
