/**
 * 🔷 What is Node.js?
 * - Node.js is a runtime environment that lets you run JavaScript on the server side (outside the browser).
 * - Built on Chrome's V8 engine.
 * - Enables backend development with JavaScript.
 *
 * 🔷 What is Express.js?
 * - Express.js is a minimal and flexible Node.js web framework.
 * - Helps to handle routes, middleware, requests, responses, etc.
 * - Simplifies building RESTful APIs.
 */



/*
nodemon stands for Node Monitor.
nodemon is a tool that automatically restarts  Node.js application whenever  save changes to  files.

Thunder Client is a lightweight REST API client built into Visual Studio Code.
It’s similar to Postman, but faster and runs right inside VS Code.
 */
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON from request body
app.use(express.json());

/**
 * 🟩 Basic GET Route - Home Page
 */
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page! 🚀');
});

/**
 * 🟩 GET Route - About Page
 */
app.get('/about', (req, res) => {
  res.send('This is the About Page of our Node.js + Express.js app!');
});

/**
 * 🟦 POST Route - Accept JSON data
 */
app.post('/contact', (req, res) => {
  const { name, email } = req.body;
  res.send(`Thanks for contacting us, ${name}! We will reach out to ${email}`);
});

/**
 * 🟨 Route with Params - req.params
 * Example: GET /user/101
 */
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is: ${userId}`);
});

/**
 * 🟨 Multiple Params Example
 * Example: GET /post/22/comment/7
 */
app.get('/post/:postId/comment/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  res.send(`Post ID: ${postId}, Comment ID: ${commentId}`);
});

/**
 * 🟧 Query Parameters - req.query
 * Example: GET /search?term=nodejs&sort=latest
 */
app.get('/search', (req, res) => {
  const term = req.query.term || 'not specified';
  const sort = req.query.sort || 'none';
  res.send(`Search Term: ${term}, Sort By: ${sort}`);
});

/**
 * 🛠 Example Application Scenarios:
 *
 * - REST APIs: /users, /posts, /products
 * - User Authentication: /login, /register
 * - Admin Panels & Dashboards
 * - Real-time apps (chat, live notifications using Socket.io)
 * - Form submissions & validation
 * - MongoDB/Mongoose Integration (in future)
 */

app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
