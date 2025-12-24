import Rating from '../models/Rating.js';
import ratingConstraints from '../../utils/constraints/ratingConstraints.js';
import {calculateAverageScore} from "../utils/utils.js";

const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.getAll();
        res.status(200).json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching ratings' });
    }
}

const getRatingById = async (req, res) => {
    try {
        // resource retrieved from resourceExists middleware
        const rating = req.resource;
        res.status(200).json(rating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching rating' });
    }
}

const createRating = async (req, res) => {
    try {
        const { user_id, movie_id, score, comment } = req.body;

        // Round score to the specified decimal places
        const multiplier = Math.pow(10, ratingConstraints.score.decimalPlaces)
        const scoreRounded = Math.round(score * multiplier) / multiplier;

        const ratingData = { user_id, movie_id, scoreRounded, comment };
        const result = await Rating.create(ratingData);
        res.status(201).json(result);
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
            return res.status(409).json({message: 'Rating for this user and movie already exists'});
        }

        console.error(error);
        res.status(500).json({ message: 'Server error while creating rating' });
    }
}

const updateRating = async (req, res) => {
    try {
        const id = req.params.id;
        let { score, comment, edited } = req.body;

        // Round score to the specified decimal places
        const multiplier = Math.pow(10, ratingConstraints.score.decimalPlaces)
        score = Math.round(score * multiplier) / multiplier;

        const ratingData = { score, comment, edited };
        const result = await Rating.update(id, ratingData);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating rating' });
    }
}

const deleteRating = async (req, res) => {
    try {
        const id = req.params.id;

        await Rating.delete(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting rating' });
    }
}

const getMovieRatingsWithDetails = async (req, res) => {
    try {
        const movieId = req.params.id;
        const ratings = await Rating.getMovieRatingsWithDetails(movieId);

        const averageScore = calculateAverageScore(ratings);

        res.status(200).json({
            ratingsList: ratings,
            averageScore: averageScore
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching movie ratings' });
    }
}

export { getAllRatings, getRatingById, createRating, updateRating, deleteRating, getMovieRatingsWithDetails };
