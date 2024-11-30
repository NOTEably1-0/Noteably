import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add,
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  Edit,
  Delete,
  PriorityHigh,
  LowPriority,
  Star,
  EventNote,
} from "@mui/icons-material";

const apiUrl = "http://localhost:8080/api/schedules";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    priority: "moderate",
    startDate: "",
    endDate: "",
    colorCode: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [calendarView, setCalendarView] = useState("dayGridMonth");

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${apiUrl}/getAll`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules", error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addOrUpdateSchedule = async () => {
    try {
      const url = isEditMode
        ? `${apiUrl}/editSched/${selectedId}`
        : `${apiUrl}/postSched`;
      const method = isEditMode ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "application/json" },
      });

      setFormData({
        title: "",
        priority: "moderate",
        startDate: "",
        endDate: "",
        colorCode: "",
      });
      setIsEditMode(false);
      setOpenDialog(false);
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

  const groupedSchedules = {
    high: schedules.filter((schedule) => schedule.priority === "high"),
    moderate: schedules.filter((schedule) => schedule.priority === "moderate"),
    low: schedules.filter((schedule) => schedule.priority === "low"),
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <PriorityHigh sx={{ color: "#FF6F61" }} />;
      case "moderate":
        return <Star sx={{ color: "#FFD166" }} />;
      case "low":
        return <LowPriority sx={{ color: "#06D6A0" }} />;
      default:
        return <EventNote />;
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        background: "linear-gradient(to right, #ffecd2, #fcb69f)",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: "#333", fontWeight: "bold" }}>
          My Cute Calendar
        </Typography>
        <Box>
          <Tooltip title="Add Schedule">
            <IconButton
              onClick={() => setOpenDialog(true)}
              sx={{
                backgroundColor: "#FFD166",
                color: "#fff",
                "&:hover": { backgroundColor: "#FFC067" },
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Options">
            <IconButton
              sx={{ ml: 1, backgroundColor: "#06D6A0", color: "#fff" }}
              onClick={() => setCalendarView((prev) => prev)}
            >
              <CalendarToday />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Calendar */}
      <Box
        sx={{
          borderRadius: "15px",
          boxShadow: 3,
          overflow: "hidden",
          mb: 4,
          backgroundColor: "#fff",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView={calendarView}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          events={schedules.map((schedule) => ({
            title: schedule.title,
            start: schedule.startDate,
            end: schedule.endDate || schedule.startDate,
            backgroundColor: schedule.colorCode,
          }))}
          height="600px"
        />
      </Box>

      {/* Schedule Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditMode ? "Edit Schedule" : "Add Schedule"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleFormChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleFormChange}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Select
            name="priority"
            value={formData.priority}
            onChange={handleFormChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
          <Select
            name="colorCode"
            value={formData.colorCode}
            onChange={handleFormChange}
            fullWidth
          >
            <MenuItem value="#EF476F" style={{ color: "#EF476F" }}>
              Pink
            </MenuItem>
            <MenuItem value="#06D6A0" style={{ color: "#06D6A0" }}>
              Green
            </MenuItem>
            <MenuItem value="#118AB2" style={{ color: "#118AB2" }}>
              Blue
            </MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={addOrUpdateSchedule} color="primary">
            {isEditMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h6" sx={{ mb: 3, color: "#4A90E2" }}>
        Priority Schedules
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        {Object.keys(groupedSchedules).map((priority, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              backgroundColor: "#f4f4f4",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                textAlign: "center",
                color:
                  priority === "high"
                    ? "#EF476F"
                    : priority === "moderate"
                    ? "#FFD166"
                    : "#06D6A0",
              }}
            >
              {priority.toUpperCase()} PRIORITY
            </Typography>
            {groupedSchedules[priority].map((schedule) => (
              <Box
                key={schedule.scheduleID}
                sx={{
                  backgroundColor: schedule.colorCode,
                  borderRadius: "15px",
                  padding: "16px",
                  mb: 3,
                  color: "#ffffff",
                  boxShadow: 3,
                }}
              >
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                  {getPriorityIcon(schedule.priority)} {schedule.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#ffffff" }}>
                  <EventNote /> {schedule.startDate}{" "}
                  {schedule.endDate && `- ${schedule.endDate}`}
                </Typography>
                <Box sx={{ display: "flex", gap: "1", mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    sx={{
                      backgroundColor: "#A5D6A7",
                      color: "#fff",
                      borderRadius: "20px",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Delete />}
                    color="error"
                    sx={{ borderRadius: "20px" }}
                    onClick={() => deleteSchedule(schedule.scheduleID)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Schedule;
