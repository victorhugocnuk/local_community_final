import db from './database.mjs';

// Perform a database operation.
// This function adds a new user to the database.
function insertUser(name, age) {
  // Use a prepared statement to prevent SQL injection vulnerabilities.
  const stmt = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');
  
  // Run the statement with the provided values.
  stmt.run(name, age, function(err) {
    if (err) {
      console.error('Error inserting user:', err.message);
    } else {
      console.log(`Successfully inserted user: ${name} with ID: ${this.lastID}`);
    }
    // Close the prepared statement after it has been used.
    stmt.finalize();
  });
}

// Perform a database query.
// This function fetches all users and logs them to the console.
function getUsers() {
  db.all('SELECT id, name, age FROM users', [], (err, rows) => {
    if (err) {
      console.error('Error querying users:', err.message);
    } else {
      console.log('\nAll users in the database:');
      rows.forEach((row) => {
        console.log(`- ID: ${row.id}, Name: ${row.name}, Age: ${row.age}`);
      });
    }
    // Close the database connection when done.
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('\nDatabase connection closed.');
      }
    });
  });
}

// Run the functions in sequence.
// First, insert a new user.
insertUser('Maria Silva', 25);

// Then, get and log all users after a small delay to ensure insertion is complete.
// In a real application, you would handle this with callbacks or Promises.
setTimeout(getUsers, 500);
