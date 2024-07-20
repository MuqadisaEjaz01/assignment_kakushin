
import express from 'express'
const router=express.Router()
import authMiddleware  from '../Middleware/Auth.js';
import { addTask, deleteTask, getTask, updateTask } from '../Controller/Task.js';



// routes of a task 
router.post('/add', authMiddleware, addTask);
router.put('/update/:title',authMiddleware,updateTask )
router.delete('/delete/:title',authMiddleware,deleteTask )
router.get('/read',authMiddleware,getTask)


export default router;