import Movie from '../models/Movie.js';
import Rating from '../models/Rating.js';
import { calculateAverageScore } from '../utils/utils.js';

const getAllMovies = async (req, res) => {
    try {
        // Get filters from query params ('undefined' if not provided)
        const filters = {};

        if (req.query.genres) {
            filters.genres = Array.isArray(req.query.genres)
                ? req.query.genres
                : [req.query.genres];
        }

        if (req.query.minDate) {
            filters.minDate = req.query.minDate;
        }

        if (req.query.maxDate) {
            filters.maxDate = req.query.maxDate;
        }

        const movies = await Movie.getAll(filters);

        const moviesWithRatings = await Promise.all(
            movies.map(async movie => {
                const ratings = await Rating.getByMovieId(movie.id);

                let averageScore = calculateAverageScore(ratings);

                return {
                    ...movie,
                    averageScore: averageScore,
                    count: ratings.length,
                    ratingsList: ratings,
                }
            })
        );

        res.status(200).json(moviesWithRatings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching movies' });
    }
}

const getTopMoviesByRating = async (req, res) => {
    try {
        const count = parseInt(req.params.count);

        if (isNaN(count) || count <= 0) {
            return res.status(400).json({ message: 'Count must be a positive integer' });
        }

        const movies = await Movie.getTopByRating(count);
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching top movies' });
    }
}

const getMovieFilterFormFields = async (req, res) => {
    try {
        const result = await Movie.getFilterFormFields();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching movie filter form fields' });
    }
}

const getMovieById = async (req, res) => {
    try {
        // resource retrieved from resourceExists middleware
        const movie = req.resource;

        // Get ratings for the movie
        const ratings = await Rating.getWithUserInfo(movie.id);

        // Calculate average score
        let averageScore = calculateAverageScore(ratings);

        res.status(200).json({
            ...movie,
            averageScore: averageScore,
            count: ratings.length,
            ratingsList: ratings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching movie' });
    }
}

const createMovie = async (req, res) => {
    try {
        const movie = req.body;

        const result = await Movie.create(movie);
        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating movie' });
    }
}

const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMovie = req.body;

        await Movie.update(id, updatedMovie);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating movie' });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;

        await Movie.delete(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting movie' });
    }
}

const getMovieCreateFormFields = async (req, res) => {
    try {
        const fields = await Movie.getCreateFormFields();
        res.status(200).json(fields);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching create form fields' });
    }
}

export { getAllMovies, getMovieFilterFormFields, getTopMoviesByRating, getMovieById, createMovie, updateMovie, deleteMovie, getMovieCreateFormFields };
