const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {

  // POST /api/auth/register
  // This is where new users sign up for the planner
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      // I added a check for all fields to make sure we don't get empty data
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
      }

      await User.register(name, email, password);
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  },

  // This handles the login and gives back a JWT token for security
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

      // Create Token - I set this to last for 1 day
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

  // This simple function lets the frontend check who is currently logged in
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
