const db = require('../config/database');

async function check() {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM users');
    console.log('Database connected successfully.');
    console.log('User count:', rows[0].count);
    process.exit(0);
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
}

check();
