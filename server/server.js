import app from './app.js';
import db from './config/database/db.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
