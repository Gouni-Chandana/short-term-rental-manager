const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const users = {}; // In-memory user store: { email: password }
const stays = []; // In-memory stays store

// Hardcoded admin credentials
const adminUser = {
  username: 'admin',
  password: 'admin123'
};

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  if (users[email]) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  users[email] = password;
  return res.status(201).json({ message: 'User registered successfully.' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  if (!users[email]) {
    return res.status(404).json({ message: 'User not found. Please sign up.' });
  }
  if (users[email] !== password) {
    return res.status(401).json({ message: 'Invalid password.' });
  }
  return res.status(200).json({ message: 'Login successful.' });
});

// Admin login endpoint
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === adminUser.username && password === adminUser.password) {
    return res.status(200).json({ message: 'Admin login successful.' });
  }
  return res.status(401).json({ message: 'Invalid admin credentials.' });
});

// Add stay endpoint (admin only)
app.post('/addStay', (req, res) => {
  const { name, locality, price, address, facilities, map, nearby } = req.body;
  if (!name || !locality || !price || !address) {
    return res.status(400).json({ message: 'Missing required stay details.' });
  }
  const newStay = { name, locality, price, address, facilities, map, nearby };
  stays.push(newStay);
  return res.status(201).json({ message: 'Stay added successfully.', stay: newStay });
});

// Get stays endpoint (for users)
app.get('/stays', (req, res) => {
  return res.status(200).json(stays);
});

app.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});
