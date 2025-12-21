import Movie from '../models/Movie.js';
import Rating from '../models/Rating.js';
import { calculateAverageScore } from '../utils/movieUtils.js';

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAll();

        const moviesWithRatings = await Promise.all(
            movies.map(async movie => {
                const ratings = await Rating.getMovieRatingsWithDetails(movie.id);

                let averageScore = calculateAverageScore(ratings);

                return {
                    ...movie,
                    averageScore: averageScore,
                    ratingsCount: ratings.length,
                    ratings: ratings,
                }
            })
        );

        res.status(200).json(moviesWithRatings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching movies' });
    }
}

const getMovieById = async (req, res) => {
    try {
        // resource retrieved from resourceExists middleware
        const movie = req.resource;

        // Get ratings for the movie
        const ratings = await Rating.getMovieRatingsWithDetails(movie.id);

        // Calculate average score
        let averageScore = calculateAverageScore(ratings);

        res.status(200).json({
            ...movie,
            averageScore: averageScore,
            ratingsCount: ratings.length,
            ratings: ratings
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
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while creating movie' });
    }
}

const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMovie = req.body;

        const result = await Movie.update(id, updatedMovie);
        res.status(200).json(result);
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

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
