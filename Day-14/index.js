const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const users = [];

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(user);

  res.status(201).json({ message: 'User created successfully.', userId: user.id });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
