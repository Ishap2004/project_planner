const db = require('../config/database');

const Task = {

  // Get all tasks for a user
  getAllByUser: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE user_id = ?',
      [userId]
    );
    return rows;
  },

  // Create new task
  create: async (userId, title, type, due_date, priority) => {
    const [result] = await db.query(
      `INSERT INTO tasks (user_id, title, type, due_date, priority)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, title, type, due_date, priority]
    );
    return result.insertId;
  },

  // Update task status
  update: async (id, status) => {
    const [result] = await db.query(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Task not found');
    }
  },

  // Delete task
  delete: async (id) => {
    const [result] = await db.query(
      'DELETE FROM tasks WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Task not found');
    }
  }
};

module.exports = Task;