import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";


const  app = express();
mongoose.connect("mongodb://127.0.0.1:27017/kakushinAssign")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


  app.use(express.json());
  app.use(cors())



import TaskRoute from './Routes/Task.js'
import UserRoute from './Routes/User.js'

  app.use('/api/task',TaskRoute)
  app.use('/api/user',UserRoute)
  


app.listen(4200, () => {
  console.log("Server started on port 4200");
});


