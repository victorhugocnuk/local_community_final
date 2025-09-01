import sqlite3 from 'sqlite3';

// Connects to the SQLite database file.
// The database file is created if it does not exist.
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    // If there is an error, log it to the console.
    console.error('Error connecting to the database:', err.message);
  } else {
    // If the connection is successful, log a success message.
    console.log('Successfully connected to the database.');
    
    // Create a 'users' table if it doesn't already exist.
    // This is good practice to avoid errors if the script is run multiple times.
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER
    )`, (err) => {
      if (err) {
        // If there is an error creating the table, log it.
        console.error('Failed to create the "users" table:', err.message);
      } else {
        // If the table is created successfully, log a confirmation.
        console.log('The "users" table has been created or already exists.');
      }
    });
  }
});

// Export the database connection object so it can be used in other files.
export default db;