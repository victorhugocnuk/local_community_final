import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// The error was here.
// This import assumes mockData.js has a default export.
// Since it doesn't, we import the getData function directly instead.
import { getData } from './mockData.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the port number on which the server will listen for requests.
const PORT = 5000;

// Initialize the Express application instance.
const app = express();

// Root route ('/')
app.get('/', (req, res) => {
    res.send('Welcome to the Community Portal!');
});

// FAQ page route
app.get('/faq', (req, res) => {
    res.send('This is the FAQ Page.');
});

// Contact page route
app.get('/contact', (req, res) => {
    res.send('You can contact us here.');
});

// Start the server, making it listen for connections on the specified port.
// A callback function logs a confirmation message to the console upon successful startup.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
