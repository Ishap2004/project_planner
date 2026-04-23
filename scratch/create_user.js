const User = require('../models/User');

async function createUser() {
  try {
    const name = 'Test User';
    const email = 'test@example.com';
    const password = 'password123';
    
    const userId = await User.register(name, email, password);
    console.log(`User created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (err) {
    if (err.message === 'User already exists') {
      console.log('User test@example.com already exists. You can use it with password "password123" (if it was created with this script before).');
    } else {
      console.error('Error creating user:', err.message);
    }
    process.exit(1);
  }
}

createUser();
