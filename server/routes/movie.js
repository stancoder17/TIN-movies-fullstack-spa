import express from 'express';
import { getAllMovies, getMovieById, getMovieFilterFormFields, createMovie, updateMovie, deleteMovie, getTopMoviesByRating } from '../controllers/movieController.js';
import {getMovieRatingsWithDetails} from "../controllers/ratingController.js";
import validateMovie from '../middleware/movieValidation.js';
import validateId from '../middleware/idValidation.js';
import resourceExists from '../middleware/resourceExists.js';
import Movie from '../models/Movie.js';
const router = express.Router();

router.get('/', getAllMovies);
router.get('/filter-fields', getMovieFilterFormFields);
router.get('/top/:count', getTopMoviesByRating);
router.get('/:id', validateId, resourceExists(Movie), getMovieById);
router.get('/:id/ratings', validateId, resourceExists(Movie), getMovieRatingsWithDetails);
router.post('/', validateMovie, createMovie);
router.put('/:id', validateId, resourceExists(Movie), validateMovie, updateMovie);
router.delete('/:id', validateId, resourceExists(Movie), deleteMovie);

export default router;