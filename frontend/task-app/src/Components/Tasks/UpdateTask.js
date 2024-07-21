
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, Button, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import ReadTask from './ReadTask.js'
function UpdateTask() {
  const [title, setTitle] = useState('');

  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const handleTitleChanged = (event) => {
    setTitle(event.target.value);
  };


  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://localhost:4200/api/task/update/${title}`, {
       
         status: status,
     
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Task updated!');
         navigate('/delete-task');
      } else {
        alert('Failed to updated task!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating the task.');
    }

    setTitle('');
    setStatus('');
  };

  return (
    <>
   <ReadTask/>
    <Container component="main" maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Update Task
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={title}
                onChange={handleTitleChanged}
              />
              
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  value={status}
                  onChange={handleStatusChange}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, backgroundColor: '#2F4A62' }}
              >
                Update Task
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  );
}

export default UpdateTask;
