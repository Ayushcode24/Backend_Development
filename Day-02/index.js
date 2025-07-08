// ==============================
// 🔥 0. Setup
// ==============================

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let notes = [
  { id: 1, text: 'Learn Node.js' },
  { id: 2, text: 'Build REST API' }
];

// ==============================
// 1️⃣ RESTful API
// ==============================
// Definition:
// REST API is a set of rules for building web APIs using HTTP methods (GET, POST, PUT, DELETE).

// Syntax:
app.get('/notes', (req, res) => {
  res.status(200).json(notes);
});

app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).send('Note not found');
  res.json(note);
});

app.post('/notes', (req, res) => {
  const newNote = { id: notes.length + 1, text: req.body.text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.put('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id == req.params.id);
  if (!note) return res.status(404).send('Note not found');
  note.text = req.body.text;
  res.json(note);
});

app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(n => n.id != req.params.id);
  res.status(204).send();
});

// ==============================
// 2️⃣ CORS (Cross-Origin Resource Sharing)
// ==============================
// Definition: Allows frontend (from different origin) to access backend
// Syntax: app.use(cors()) — already added above

// ==============================
// 3️⃣ Axios
// ==============================
// Definition: Axios is a promise-based HTTP client for making requests
// Usage Example (client-side):
/*
axios.post('http://localhost:5000/notes', {
  text: 'Axios Note'
});
*/

// ==============================
// 4️⃣ Server ↔ Client Communication
// ==============================

// Server to Client
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Client to Server
app.post('/greet', (req, res) => {
  const name = req.body.name;
  res.send(`Hello, ${name}`);
});

// ==============================
// 5️⃣ Middleware
// ==============================
// Definition: Middleware is a function that runs before the route handler

// Logger Middleware
function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
}
app.use(logger);

// Validation Middleware
function checkName(req, res, next) {
  if (!req.body.name) return res.status(400).send('Name is required');
  next();
}
app.post('/validate', checkName, (req, res) => {
  res.send(`Hello ${req.body.name}`);
});

// ==============================
// 6️⃣ HTTP Status Code Ranges
// ==============================
// 1xx: Informational
// 2xx: Success (200 OK, 201 Created, 204 No Content)
// 3xx: Redirection
// 4xx: Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found)
// 5xx: Server Error (500 Internal Server Error)

// Example:
app.get('/status-demo', (req, res) => {
  res.status(200).send('Everything is OK');
});

// ==============================
// 7️⃣ HTTP Headers
// ==============================
// Definition: Key-value pairs sent in requests and responses

// Example Header Set:
app.get('/headers-demo', (req, res) => {
  res.set('X-Server', 'Ayush Backend');
  res.send('Header set!');
});

// ==============================
// 8️⃣ Types of HTTP Headers
// ==============================
// 1. General Headers       → Common to both request and response
// 2. Request Headers       → Sent by client (e.g., Authorization)
// 3. Response Headers      → Sent by server (e.g., Content-Type)
// 4. Entity Headers        → Describe the body (e.g., Content-Length)

// ==============================
// 9️⃣ Custom Headers
// ==============================
app.get('/custom-header', (req, res) => {
  res.set('X-Custom-Note', 'This is a custom header');
  res.send('Custom header sent');
});

// ==============================
// 🔟 req.get()
// ==============================
// Definition: Get a specific request header
app.get('/check-agent', (req, res) => {
  const userAgent = req.get('User-Agent');
  res.send(`You are using: ${userAgent}`);
});

// ==============================
// 🔢 req.headers
// ==============================
// Definition: Access all headers
app.get('/all-headers', (req, res) => {
  console.log(req.headers);
  res.send('Logged all headers in console');
});

// ==============================
// 🔣 res.set()
// ==============================
// Definition: Set a response header
app.get('/set-header', (req, res) => {
  res.set('X-App', 'Backend75');
  res.send('Header set using res.set()');
});

// ==============================
// 🚫 res.removeHeader()
// ==============================
// Definition: Remove a previously set header before sending response
app.get('/remove-header', (req, res) => {
  res.set('X-Remove-Me', 'to-be-removed');
  res.removeHeader('X-Remove-Me');
  res.send('Header was removed before sending');
});

// ==============================
// ✅ Start Server
// ==============================

app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
