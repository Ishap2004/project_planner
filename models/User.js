const db = require('../config/database');

const User = {
  // 1. Read All Users
  getAllUsers: async function() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  // 2. Create New User
  create: async function(name, email, password) {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [name, email, password]);
    return result.insertId; // Returns the new ID
  },

  findByEmail: async (email) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }
};

module.exports = User;