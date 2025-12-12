import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

export default app;
