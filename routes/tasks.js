const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.getAllByUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create task
router.post('/', auth, async (req, res) => {
  const { title, type, due_date, priority } = req.body;

  try {
    const taskId = await Task.create(
      req.user.id,
      title,
      type,
      due_date,
      priority
    );

    res.status(201).json({ message: 'Task created', taskId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;

  try {
    await Task.update(req.params.id, status);
    res.json({ message: 'Task updated' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.json({ message: 'Task deleted' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;