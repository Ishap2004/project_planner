const Task = require('../models/Task');

const taskController = {

  // GET /tasks
  getTasks: async (req, res) => {
    try {
      const tasks = await Task.getAllByUser(req.user.id);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /tasks
  createTask: async (req, res) => {
    try {
      const { title, type, due_date, priority } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title required' });
      }

      const newId = await Task.create(
        req.user.id,
        title,
        type,
        due_date,
        priority
      );

      res.status(201).json({
        message: 'Task created',
        id: newId
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT /tasks/:id
  updateTask: async (req, res) => {
    try {
      await Task.update(req.params.id, req.body.status);
      res.json({ message: 'Task updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /tasks/:id
  deleteTask: async (req, res) => {
    try {
      await Task.delete(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = taskController;