import dotenv from 'dotenv';
import app from './app.js';
import db from './db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Check database connection before starting the server
db.getConnection()
    .then(connection => {
        console.log('Connected to the database successfully.');
        connection.release();

        // If database works - start the server
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error while connecting to the database:', err.message);
        process.exit(1);
    });