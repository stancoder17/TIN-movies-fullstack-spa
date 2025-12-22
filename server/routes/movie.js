import express from 'express';
const router = express.Router();
import { getAllMovies, getMovieById, getMovieFilterFormFields, createMovie, updateMovie, deleteMovie, getTopMoviesByRating } from '../controllers/movieController.js';
import validateMovie from '../middleware/movieValidation.js';
import validateId from '../middleware/idValidation.js';
import resourceExists from '../middleware/resourceExists.js';
import Movie from '../models/Movie.js';

router.get('/', getAllMovies);
router.get('/filter-fields', getMovieFilterFormFields);
router.get('/top/:count', getTopMoviesByRating);
router.get('/:id', validateId, resourceExists(Movie), getMovieById);
router.post('/', validateMovie, createMovie);
router.put('/:id', validateId, resourceExists(Movie), validateMovie, updateMovie);
router.delete('/:id', validateId, resourceExists(Movie), deleteMovie);

export default router;