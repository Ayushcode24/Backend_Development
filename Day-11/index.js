// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');              // For password hashing
const jwt = require('jsonwebtoken');           // For generating JWT tokens
const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/auth_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Define User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Secret key for JWT (in production, use an environment variable)
const JWT_SECRET = 'myverysecretkey';

// Middleware to protect private routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('No token provided');

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // Decode and verify token
    req.user = decoded;  // Attach user info to request
    next();              // Allow request to proceed
  } catch (err) {
    res.status(401).send('Invalid or expired token');
  }
}

// SIGN UP - Register a new user
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).send('User already exists');

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to MongoDB
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.status(201).send('User registered successfully');
});

// LOGIN - Authenticate and return JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send('Invalid email or password');

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send('Invalid email or password');

  // Generate JWT token
  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ message: 'Login successful', token });
});

// LOGOUT - On client side, delete token (example route for awareness)
app.post('/logout', (req, res) => {
  // No real server-side logout with JWT (unless using a token blacklist)
  res.send('Logout successful (client should delete token)');
});

// Example of a protected route
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`Welcome, user with ID: ${req.user.userId}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Auth server running on http://localhost:${PORT}`));
