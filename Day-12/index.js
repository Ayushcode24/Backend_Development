// 1. Import Required Modules
const express = require('express');     // Web framework
const mongoose = require('mongoose');   // MongoDB ODM
const bcrypt = require('bcrypt');       // Password hashing
const app = express();                  // Create Express app

// 2. Middleware to parse JSON bodies
app.use(express.json());

// 3. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 4. Define User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 5. Registration Route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // a. Basic input check
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // b. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // c. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

  // d. Save the user
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  // e. Respond to client
  res.status(201).json({ message: '🎉 User registered successfully!' });
});

// 6. Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
