import Rating from '../models/Rating.js';

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

        const ratingData = { user_id, movie_id, score, comment };
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
        const { score, comment } = req.body;

        const ratingData = { score, comment };
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

export { getAllRatings, getRatingById, createRating, updateRating, deleteRating };
