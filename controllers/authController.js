const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {

  // POST /api/auth/register
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ 
          success: false, 
          error: 'Please provide name, email and password' 
        });
      }

      const userId = await User.register(name, email, password);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: { userId }
      });

    } catch (err) {
      if (err.message === 'User already exists') {
        return res.status(409).json({ success: false, error: err.message });
      }
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // POST /api/auth/login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          error: 'Please provide email and password' 
        });
      }

      const user = await User.login(email, password);

      // Create Token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });

    } catch (err) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  },

  // GET /api/auth/me
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = authController;
