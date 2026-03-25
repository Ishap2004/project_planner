const db = require('../config/database');
const bcrypt = require('bcrypt');

const User = {

  // Register
  register: async (name, email, password) => {
    const [existing] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return result.insertId;
  },

  // Login
  login: async (email, password) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      throw new Error('User not found');
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }
    return user;
  },

  // Find by ID
  findById: async (id) => {
    const [rows] = await db.query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }
};

module.exports = User;