const Task = require('../models/Task');

const taskController = {

  // GET /api/tasks
  // This function gets all tasks that belong to the logged-in user
  getTasks: async (req, res) => {
    try {
      // I'm using req.user.id which comes from the auth middleware
      const tasks = await Task.getAllByUser(req.user.id);
      res.json({ success: true, data: tasks });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // POST /api/tasks
  // This creates a new task and saves it in the database
  createTask: async (req, res) => {
    try {
      const { title, type, due_date, priority } = req.body;

      if (!title) {
        return res.status(400).json({ success: false, error: 'Title required' });
      }

      const newId = await Task.create(
        req.user.id,
        title,
        type,
        due_date,
        priority
      );

      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: { id: newId }
      });

    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // PUT /api/tasks/:id
  updateTask: async (req, res) => {
    try {
      const { status } = req.body;
      if (status === undefined) {
        return res.status(400).json({ success: false, error: 'Status is required' });
      }

      await Task.update(req.params.id, req.user.id, status);
      res.status(200).json({ success: true, message: 'Task updated successfully' });
    } catch (err) {
      if (err.message.includes('not found')) {
        return res.status(404).json({ success: false, error: err.message });
      }
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // DELETE /api/tasks/:id
  deleteTask: async (req, res) => {
    try {
      await Task.delete(req.params.id, req.user.id);
      res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (err) {
      if (err.message.includes('not found')) {
        return res.status(404).json({ success: false, error: err.message });
      }
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = taskController;