// index.mjs

// Import the Express framework to create the server application.
import express from 'express';

// Define the port number on which the server will listen for requests.
const PORT = 5000;

// Initialize the Express application instance.
const app = express();

// --- Route Definitions ---

// Define the root route ('/').
// When a GET request is made to this path, the server responds with a simple welcome message.
app.get('/', (req, res) => {
  res.send('Welcome to the Community Portal!');
});

// Define the '/faq' route.
// This route is designed to handle GET requests for the FAQ page.
app.get('/faq', (req, res) => {
  res.send('This is the FAQ Page.');
});

// Define the '/contact' route.
// This route provides a message for the contact page upon a GET request.
app.get('/contact', (req, res) => {
  res.send('You can contact us here.');
});

// --- Server Initialization ---

// Start the server, making it listen for connections on the specified port.
// A callback function logs a confirmation message to the console upon successful startup.
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
