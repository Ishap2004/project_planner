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

const app = express();

// Database connection
require('./config/database');

// Import Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

// Middleware
app.use(logger('dev')); // logs requests
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: false })); // parse form data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Test route (VERY IMPORTANT for debugging & demo)
app.get('/', (req, res) => {
  res.send('🚀 Project Planner API is running...');
});

// Routes
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// (Optional) Keep index route if needed
app.use('/home', indexRouter);

// 404 - Not Found handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

module.exports = app;