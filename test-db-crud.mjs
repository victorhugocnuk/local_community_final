import sqlite3 from 'sqlite3';
import {
    open
} from 'sqlite';

/**
 * Function to open the database connection.
 * @returns {Promise<Object>} An open database object.
 */
async function openDb() {
    return open({
        filename: './database.db', // The name of your database file
        driver: sqlite3.Database,
    });
}

/**
 * Function to insert a new user into the database.
 * @param {string} name - The user's name.
 * @param {number} age - The user's age.
 */
export async function insertUser(name, age) {
    const db = await openDb();
    await db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age]);
    console.log(`User ${name} inserted successfully.`);
    db.close();
}

/**
 * Function to read all users from the database.
 * @returns {Promise<Array>} An array of users.
 */
export async function getUsers() {
    const db = await openDb();
    const users = await db.all('SELECT * FROM users');
    db.close();
    return users;
}

/**
 * Function to update a user's age.
 * @param {number} id - The user's ID.
 * @param {number} newAge - The new age.
 */
export async function updateUserAge(id, newAge) {
    const db = await openDb();
    await db.run('UPDATE users SET age = ? WHERE id = ?', [newAge, id]);
    console.log(`User with ID ${id} age updated to ${newAge}.`);
    db.close();
}

/**
 * Function to delete a user from the database.
 * @param {number} id - The ID of the user to be deleted.
 */
export async function deleteUser(id) {
    const db = await openDb();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    console.log(`User with ID ${id} deleted successfully.`);
    db.close();
}
