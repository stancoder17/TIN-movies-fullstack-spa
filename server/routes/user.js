import express from 'express';
const router = express.Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import validateUser from '../middleware/userValidation.js';
import validateId from '../middleware/idValidation.js';
import resourceExists from '../middleware/resourceExists.js';
import User from '../models/User.js';

router.get('/', getAllUsers);
router.get('/:id', validateId, resourceExists(User), getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', validateId, resourceExists(User), validateUser, updateUser);
router.delete('/:id', validateId, resourceExists(User), deleteUser);

export default router;