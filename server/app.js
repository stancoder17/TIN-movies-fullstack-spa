import express from 'express';
import cors from 'cors';
import movieRouter from './routes/movie.js';
import userRouter from './routes/user.js';
import ratingRouter from './routes/rating.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/movies', movieRouter);
app.use('/api/users', userRouter);
app.use('/api/ratings', ratingRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

export default app;
