import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReadTask = () => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4200/api/task/read', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const taskData = response.data.tasks;
        setTasks(taskData);
        console.log(taskData)
      } else {
        alert('Failed to fetch tasks!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching the tasks.');
    }
  };

  return (
    <div style={{ marginTop: '40px', marginLeft: '40px' }}>
      {tasks.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: '#2F4A62' }}>
              <TableRow>
                <TableCell style={{ color: 'white' }}>Title</TableCell>
                <TableCell style={{ color: 'white' }}>Description</TableCell>
                <TableCell style={{ color: 'white' }}>Status</TableCell>
                <TableCell style={{ color: 'white' }}>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default ReadTask;
