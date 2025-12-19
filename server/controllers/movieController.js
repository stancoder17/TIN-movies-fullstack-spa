import Movie from '../models/Movie.js';
import Rating from '../models/Rating.js';

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.getAll();

        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching movies' });
    }
}

const getMovieById = async (req, res) => {
    try {
        const movie = req.resource;

        // Get ratings for the movie
        const ratings = await Rating.getMovieRatingsWithDetails(movie.id);

        // Calculate average score
        let averageScore = null;
        if (ratings.length > 0) {
            let ratingSum = 0;
            for (const rating of ratings) {
                ratingSum += rating.score;
            }

            averageScore = Math.round((ratingSum / ratings.length) * 10) / 10;
        }

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
