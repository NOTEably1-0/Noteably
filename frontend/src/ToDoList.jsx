import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { IconButton, Box, Typography, TextField, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const apiUrl = "http://localhost:8080/api/TodoList";

function ToDoList() {
  const [toDoItems, setToDoItems] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", scheduleID: 0, dashboardID: 0 });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dialog, setDialog] = useState({ open: false, type: "", item: null });

  const fetchToDoItems = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/getList`);
      setToDoItems(sortItems(response.data));
    } catch (error) {
      console.error("Error fetching ToDo items", error);
    }
  }, []);

  useEffect(() => {
    fetchToDoItems();
  }, [fetchToDoItems]);

  const sortItems = (items) => {
    return items.sort((a, b) => a.completed - b.completed);
  };

  const addOrUpdateToDoItem = async () => {
    try {
      const isUpdating = isEditMode && selectedId !== null;
      const url = isUpdating ? `${apiUrl}/putList/${selectedId}` : `${apiUrl}/postListRecord`;
      const method = isUpdating ? "put" : "post";

      await axios({
        method,
        url,
        data: { ...formData, toDoListID: isUpdating ? selectedId : undefined },
        headers: { "Content-Type": "application/json" }
      });

      setFormData({ title: "", description: "", scheduleID: 0, dashboardID: 0 });
      setIsEditMode(false);
      setSelectedId(null);
      fetchToDoItems();
    } catch (error) {
      console.error("Error saving ToDo item:", error);
    }
  };

  const deleteToDoItem = async (id) => {
    try {
      if (id === undefined) {
        console.error("Cannot delete item: ID is undefined");
        return;
      }
      await axios.delete(`${apiUrl}/deleteList/${id}`);
      fetchToDoItems();
    } catch (error) {
      console.error("Error deleting ToDo item:", error);
    }
  };

  const toggleComplete = async (id) => {
    const updatedItems = toDoItems.map((item) => {
      if (item.toDoListID === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setToDoItems(sortItems(updatedItems));
  };

  const handleEdit = (item) => {
    setDialog({ open: true, type: "edit", item });
  };

  const handleDelete = (item) => {
    setDialog({ open: true, type: "delete", item });
  };

  const confirmDialog = () => {
    if (dialog.type === "delete") {
      deleteToDoItem(dialog.item.toDoListID);
    } else if (dialog.type === "edit") {
      setFormData({
        title: dialog.item.title,
        description: dialog.item.description,
        scheduleID: 0,
        dashboardID: 0
      });
      setIsEditMode(true);
      setSelectedId(dialog.item.toDoListID);
    }
    setDialog({ open: false, type: "", item: null });
  };

  const cancelDialog = () => {
    setDialog({ open: false, type: "", item: null });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancelEdit = () => {
    setFormData({ title: "", description: "", scheduleID: 0, dashboardID: 0 });
    setIsEditMode(false);
    setSelectedId(null);
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '20px' }}>
      <Box style={{ marginBottom: '20px' }}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          fullWidth
          variant="outlined"
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleFormChange}
          fullWidth
          variant="outlined"
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addOrUpdateToDoItem}
          startIcon={<Add />}
          style={{ marginRight: '10px' }}
        >
          {isEditMode ? "Update Task" : "Add Task"}
        </Button>
        {isEditMode && (
          <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
        )}
      </Box>
      <Box>
        {toDoItems.map((item, index) => {
          const colors = ['#F78C6B', '#FFD166', '#06D6A0'];
          const color = item.completed ? '#D3D3D3' : colors[index % colors.length];

          return (
            <Box
              key={item.toDoListID}
              style={{
                marginBottom: '15px',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: color,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={item.completed || false}
                  onChange={() => toggleComplete(item.toDoListID)}
                  color="primary"
                />
                <Box>
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: 'bold',
                      textDecoration: item.completed ? 'line-through' : 'none',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textDecoration: item.completed ? 'line-through' : 'none',
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
              <Box style={{ display: 'flex', gap: '10px' }}>
                <IconButton onClick={() => handleEdit(item)} style={{ color: '#6A0572' }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(item)} style={{ color: '#FF6B6B' }}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={dialog.open} onClose={cancelDialog}>
        <DialogTitle>
          {dialog.type === "delete" ? "Delete Task" : "Edit Task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialog.type === "delete"
              ? "Are you sure you want to delete this record?"
              : "Are you sure you want to update this record?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDialog} color="secondary">Cancel</Button>
          <Button onClick={confirmDialog} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ToDoList;
