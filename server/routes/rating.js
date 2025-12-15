import express from 'express';
const router = express.Router();
import { getAllRatings, getRatingById, createRating, updateRating, deleteRating } from '../controllers/ratingController.js';
import validateRating from '../middleware/ratingValidation.js';
import validateId from '../middleware/idValidation.js';
import resourceExists from '../middleware/resourceExists.js';
import Rating from '../models/Rating.js';

router.get('/', getAllRatings);
router.get('/:id', validateId, resourceExists(Rating), getRatingById);
router.post('/', validateRating, createRating);
router.put('/:id', validateId, resourceExists(Rating), validateRating, updateRating);
router.delete('/:id', validateId, resourceExists(Rating), deleteRating);

export default router;