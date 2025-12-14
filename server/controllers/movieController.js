import Movie from '../models/Movie.js';
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
        const id = req.params.id;
        const movie = await Movie.getById(id);

        if (!movie) {
            res.status(404).json({ message: `Movie with id ${id} not found` });
            return;
        }

        res.status(200).json(movie);
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

        const existingMovie = await Movie.getById(id);
        if (!existingMovie) {
            res.status(404).json({ message: `Movie with id ${id} not found` });
            return;
        }

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

        const existingMovie = await Movie.getById(id);
        if (!existingMovie) {
            res.status(404).json({ message: `Movie with id ${id} not found` });
            return;
        }

        await Movie.delete(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting movie' });
    }
}

export { getAllMovies, getMovieById, createMovie, updateMovie };
