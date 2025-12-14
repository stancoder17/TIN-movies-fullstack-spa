import express from 'express';
const router = express.Router();
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import validateMovie from '../middleware/movieValidation.js';

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', validateMovie, createMovie);
router.put('/:id', validateMovie, updateMovie);
router.delete('/:id', deleteMovie);

export default router;