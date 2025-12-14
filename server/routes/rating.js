import express from 'express';
const router = express.Router();
import { getAllRatings, getRatingById, createRating, updateRating, deleteRating } from '../controllers/ratingController.js';
import validateRating from '../middleware/ratingValidation.js';

router.get('/', getAllRatings);
router.get('/:id', getRatingById);
router.post('/', validateRating, createRating);
router.put('/:id', validateRating, updateRating);
router.delete('/:id', deleteRating);

export default router;