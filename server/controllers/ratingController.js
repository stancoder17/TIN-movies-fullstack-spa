import Rating from '../models/Rating.js';
import {roundScore} from "../../utils/utils.js";
import paginationConstraints from '../../utils/constraints/paginationConstraints.js';

const getAllRatings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || paginationConstraints.defaultPage;
        const limit = parseInt(req.query.limit) || paginationConstraints.defaultLimit;

        const offset = (page - 1) * limit;

        const result = await Rating.getAll(limit, offset);
        const { ratings, totalCount } = result;
        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            ratings: ratings,
            totalCount: totalCount,
            totalPages: totalPages,
            currentPage: page,
            limit: limit
        });
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

        const scoreRounded = roundScore(score);

        const ratingData = { user_id, movie_id, score: scoreRounded, comment };
        await Rating.create(ratingData);
        res.status(201).end();
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

        score = roundScore(score);

        const ratingData = { score, comment, edited };
        await Rating.update(id, ratingData);
        res.status(204).end();
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

const getMovieRatingsWithUserInfo = async (req, res) => {
    try {
        const movieId = req.params.id;

        const ratings = await Rating.getByMovieIdWithUserInfo(movieId);
        res.status(200).json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching movie ratings' });
    }
}

const getUserRatingsWithMovieInfo = async (req, res) => {
    try {
        const userId = req.params.id;

        const ratings = await Rating.getByUserIdWithMovieInfo(userId);
        res.status(200).json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching user ratings' });
    }
}

export { getAllRatings, getRatingById, createRating, updateRating, deleteRating, getMovieRatingsWithUserInfo, getUserRatingsWithMovieInfo };
