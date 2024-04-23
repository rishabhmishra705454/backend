const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description , dueDate} = req.body;
    const newTask = new Task({ title, description,dueDate, user: req.user._id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    let query = { user: req.user._id };

    // Check if there are search terms in the query parameters
    if (req.query.search) {
      // Define a regular expression to perform a case-insensitive search
      const searchRegex = new RegExp(req.query.search, 'i');
      // Add the search condition to the query
      query.$or = [
        { title: searchRegex },
        { description: searchRegex }
      ];
    }

    // Check if there are filter parameters in the query
    if (req.query.filter) {
      const filter = req.query.filter;
      // Add filter conditions to the query based on the filter parameter
      if (filter === 'pending') {
        query.status = 'Pending';
      } else if (filter === 'in progress') {
        query.status = 'In Progress';
      }else if(filter === 'done'){
        query.status = 'Done';
      }
      // You can add more filter options based on your application requirements
    }

    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, { title, description, status, updatedAt: Date.now() }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasksForToday = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const tasks = await Task.find({
      user: req.user._id,
      dueDate: { $gte: startOfDay, $lt: endOfDay }
    });

    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
