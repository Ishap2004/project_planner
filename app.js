// require('dotenv').config();
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var app = express();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var tasksRouter = require('./routes/tasks');

// const db = require('./config/database');


// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/tasks', tasksRouter);

// module.exports = app;

require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// Database connection
const db = require('./config/database');
db.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully to:', process.env.DB_HOST);
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.error('Check your DB_HOST, DB_USER, DB_PASS, and DB_NAME environment variables.');
  });

// Import Routes
const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');
const routinesRouter = require('./routes/routines');

// Middleware
app.use(cors()); // Allow Cross-Origin Requests
app.use(logger('dev')); // logs requests
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// DEMO HIGHLIGHT: This is our Backend Express Server.
// Here we define the main API routes that listen for requests coming from our Frontend.
// API Routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/routines', routinesRouter);

// 404 - Not Found handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;