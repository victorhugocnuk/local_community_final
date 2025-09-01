// --- Imports and Configurations ---
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 5000;
const app = express();

// --- EJS and Directory Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// --- Event Data ---
// This is the data that will be passed to your EJS template
const eventData = {
    title: "Local Developer Meetup",
    description: "Connect, collaborate, and learn with the local tech community!",
    imageURL: "https://placehold.co/800x400/805ad5/fff?text=Community+Hub",
    location: "Convention Center",
    date: "October 25, 2025",
    time: "7:00 PM"
};

// --- Route Definitions ---
app.get('/', (req, res) => {
    // Renders the 'index.ejs' template and passes the 'eventData' object as 'event'
    res.render('index', { event: eventData });
});

// An example route for a static page
app.get('/faq', (req, res) => {
    res.send('This is the FAQ Page.');
});

// --- Server Initialization ---
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});