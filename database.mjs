import sqlite3 from 'sqlite3';

// Connect to the SQLite database file.
// The file is created if it does not exist.
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    // Log an error if the connection fails.
    console.error('Error connecting to the database:', err.message);
  } else {
    // Log a success message.
    console.log('Successfully connected to the database.');
    
    // Create the 'contact_messages' table if it doesn't already exist.
    db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        // Log an error if table creation fails.
        console.error('Failed to create the "contact_messages" table:', err.message);
      } else {
        // Log a confirmation message.
        console.log('The "contact_messages" table has been created or already exists.');
      }
    });
  }
});

// Function to save a contact message to the database.
export const saveContactMessage = (message) => {
    return new Promise((resolve, reject) => {
        const { name, email, message: userMessage } = message;
        const sql = `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`;
        
        // Execute the SQL query with the message data.
        db.run(sql, [name, email, userMessage], function(err) {
            if (err) {
                // Reject the Promise if an error occurs.
                console.error('Error inserting data:', err.message);
                reject(err);
            } else {
                // Resolve the Promise with the ID of the new row.
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                resolve(this.lastID);
            }
        });
    });
};

// Export the database connection object.
export default db;
