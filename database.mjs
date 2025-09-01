import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

// Workaround para __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para o arquivo do banco
const dbPath = path.join(__dirname, 'database.db');

// Conectar ao banco
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Operações no banco
db.serialize(() => {
  // Criar tabela
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INTEGER
    )`,
    (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "users" created successfully.');

        // Inserir novo usuário
        const insertStmt = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
        insertStmt.run("John Doe", 30, function (err) {
          if (err) {
            console.error('Error inserting data:', err.message);
          } else {
            console.log(`Row inserted with ID: ${this.lastID}`);

            // Consultar dados
            db.each("SELECT id, name, age FROM users", (err, row) => {
              if (err) {
                console.error('Error querying data:', err.message);
              } else {
                console.log(`ID: ${row.id}, Name: ${row.name}, Age: ${row.age}`);
              }
            }, () => {
              // Fechar conexão
              db.close((err) => {
                if (err) {
                  console.error(err.message);
                } else {
                  console.log('Database connection closed.');
                }
              });
            });
          }
        });
        insertStmt.finalize();
      }
    }
  );
});
