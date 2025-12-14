import express from 'express';
const router = express.Router();
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import validateUser from '../middleware/userValidation.js';

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', validateUser, updateUser);
router.delete('/:id', deleteUser);

export default router;