
import express from 'express'
import { addUser, loginUser } from '../Controller/User.js';
const router=express.Router()



// routes of a user 
router.post('/add',addUser)
router.post('/login',loginUser)


export default router;