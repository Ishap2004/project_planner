const db = require('../config/database');

const Task = {

  // GET all tasks for logged-in user
  getAllByUser: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE user_id = ?',
      [userId]
    );
    return rows;
  },

  // CREATE task
  create: async (userId, title, type, due_date, priority) => {
    const sql = `
      INSERT INTO tasks (user_id, title, type, due_date, priority)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      userId,
      title,
      type,
      due_date,
      priority
    ]);

    return result.insertId;
  },

  // UPDATE task
  update: async (id, status) => {
    await db.query(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id]
    );
  },

  // DELETE task
  delete: async (id) => {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  }
};

module.exports = Task;