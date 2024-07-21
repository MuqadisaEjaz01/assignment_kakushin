
import Task from "../Models/Task.js";



//*******************Create A Task****************************** */
const addTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    console.log(title)

    const found = await Task.findOne({ title });
    if (found) {
      return res.status(400).send('Task already added');
    }
    const allowedStatus = ['pending', 'in progress', 'completed'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Not correct status' });
    }
    const task = new Task({
      title,
      description,
      status,
      dueDate
    });

    await task.save();

    res.status(201).json({ message: 'Task added successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


//*******************Get All Tasks****************************** */
  const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({ });  
        res.status(200).json({tasks});
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

//*******************Update Task****************************** */
  const updateTask = async (req, res) => {
    try {

        const { title } = req.params;
        const status=req.body.status
        console.log(status)
        const allowedStatus = ['pending', 'in progress', 'completed'];
        if (!allowedStatus.includes(status)) {
          return res.status(400).json({ message: 'Not correct status' });
        }

        const task = await Task.findOneAndUpdate(
            { title },
            { status },
            { new: true }
          );
          if (!task) {
            return res.status(400).send('Task not found');
          }

          res.status(200).send('Task updated successfully');
        
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };


  //*******************Delete Task****************************** */
  const deleteTask = async (req, res) => {
    try {
      const { title } = req.params;
      console.log(title)
      const task = await Task.findOneAndDelete({ title });
  
      if (!task) {
        return res.status(400).send('Task not found');
      }
  
      res.status(200).send('Task deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  

  


  export {addTask,updateTask,deleteTask,getTask}