// Importing necessary libraries for the project
import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Initializing the Express server
const app = express();
const port = 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware to serve static files from the 'public' folder
app.use(express.static('public'));

// Configuring EJS as the view engine and setting the views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// Asynchronous function to start the connection to the SQLite database
let db;
(async () => {
    try {
        db = await open({
            filename: './database.db',
            driver: sqlite3.Database,
        });
        console.log('Connected to SQLite database.');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
})();

// Middleware to process form data (for future use)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main route for the home page
app.get('/', (req, res) => {
    // Render the home.ejs page
    res.render('home');
});

// Route for the contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route for the FAQ page
app.get('/faq', (req, res) => {
    res.render('faq');
});

// Starting the server on the defined port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
