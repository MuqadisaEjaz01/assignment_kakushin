import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login from './Components/Login/logn.js';
import AddTask from './Components/Tasks/AddTask.js';
import ReadTask from './Components/Tasks/ReadTask.js';
import UpdateTask from './Components/Tasks/UpdateTask.js';
import DeleteTask from './Components/Tasks/DeleteTask.js';
import Register from './Components/Register/Register.js';


const MainApp = () => {
  return (

      <div>
        <Routes>
        <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-task" element={<AddTask />} />
           <Route path="/read-task" element={<ReadTask />} />
           <Route path="/update-task" element={<UpdateTask />} />
         <Route path="/delete-task" element={<DeleteTask />} />  
    
        </Routes>
      </div>
    
  );
};

export default MainApp;