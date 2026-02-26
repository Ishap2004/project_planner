const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {

  // GET /users (protected later)
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Database Failed' });
    }
  },

  // REGISTER USER
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      console.log( name, email, password);

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
      }

      // HASH PASSWORD
      const hashedPassword = await bcrypt.hash(password, 10);

      const newId = await User.create(
        name,
        email,
        hashedPassword
      );

      res.status(201).json({
        message: 'User registered successfully',
        id: newId
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // LOGIN USER
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // COMPARE PASSWORD
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // CREATE TOKEN
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login successful',
        token: token
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = userController;