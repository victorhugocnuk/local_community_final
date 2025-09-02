// Import Express framework for server management
import express from 'express';
// Import 'path' module to handle file and directory paths
import path from 'path';
// Import necessary modules for handling file paths in ES Modules
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Import the function to save form data to the database
import { saveContactMessage } from './database.mjs';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.resolve(__dirname, 'public')));
// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// POST route to handle contact form submissions
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation to ensure all fields are present
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Save the data to the database
        await saveContactMessage({ name, email, message });

        // Send a success response back to the client
        res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });

    } catch (error) {
        // Log and handle any errors that occur during the process
        console.error('Error saving contact message:', error);
        res.status(500).json({ success: false, message: 'An error occurred while saving your message.' });
    }
});

// GET route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'home.ejs'));
});

// GET route to serve the FAQ page
app.get('/faq', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'faq.ejs'));
});

// GET route to serve the Contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'contact.ejs'));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// New AJAX route to get a list of developers
app.get('/developers', (req, res) => {
    // This data would typically come from a database
    const developers = [
        { name: 'Alice Johnson', skills: 'JavaScript, React' },
        { name: 'Bob Williams', skills: 'Python, Django' },
        { name: 'Charlie Brown', skills: 'Node.js, Express' },
        { name: 'Diana Prince', skills: 'HTML, CSS, UI/UX' },
        { name: 'Eddie Van Halen', skills: 'Java, Spring Boot' },
    ];
    res.json(developers);
});

// ... existing routes ...

// New AJAX route to get filtered events
app.get('/api/events', (req, res) => {
    const { year, category } = req.query;
    let query = "SELECT * FROM events WHERE 1=1";
    const params = [];

    if (year && year !== 'all') {
        query += " AND year = ?";
        params.push(year);
    }
    if (category && category !== 'all') {
        query += " AND category = ?";
        params.push(category);
    }

    try {
        const events = db.prepare(query).all(params);
        res.json(events);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Failed to retrieve events' });
    }
});

// Route to get a single event by ID
app.get('/api/events/:id', (req, res) => {
    const { id } = req.params;
    try {
        const event = db.prepare("SELECT * FROM events WHERE id = ?").get(id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Failed to retrieve event' });
    }
});

// New route for the events page
app.get('/events', (req, res) => {
    res.render('events');
});