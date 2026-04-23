const db = require('../config/database');

const Routine = {

  // Get all routines for a user
  getAllByUser: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM routines WHERE user_id = ? ORDER BY scheduled_time ASC',
      [userId]
    );
    return rows;
  },

  // Create new routine
  create: async (userId, title, scheduled_time, end_time, day_of_week) => {
    const [result] = await db.query(
      'INSERT INTO routines (user_id, title, scheduled_time, end_time, day_of_week) VALUES (?, ?, ?, ?, ?)',
      [userId, title, scheduled_time, end_time || null, day_of_week || null]
    );
    return result.insertId;
  },

  // Update routine status
  updateStatus: async (id, userId, status) => {
    const [result] = await db.query(
      'UPDATE routines SET status = ? WHERE id = ? AND user_id = ?',
      [status, id, userId]
    );

    if (result.affectedRows === 0) {
      throw new Error('Routine not found or unauthorized');
    }
  },

  // Delete routine
  delete: async (id, userId) => {
    const [result] = await db.query(
      'DELETE FROM routines WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      throw new Error('Routine not found or unauthorized');
    }
  }
};

module.exports = Routine;
