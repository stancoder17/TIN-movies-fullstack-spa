import User from '../models/User.js';
import Rating from "../models/Rating.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();

        const usersWithRatings = await Promise.all(
            users.map(async user => {
                const ratings = await Rating.getByUserId(user.id);
                return {
                    ...user,
                    ratingsCount: ratings.length
                };
            })
        );

        res.status(200).json(usersWithRatings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
}

const getUserById = async (req, res) => {
    try {
        // resource retrieved from 'resourceExists' middleware
        const user = req.resource;
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching user' });
    }
}

const getUpdateFormFields = async (req, res) => {
    try {
        const result = await User.getUpdateFormFields();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching user update form fields' });
    }
}

const createUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).end();
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
            return res.status(409).json({message: 'User with this email already exists'});
        }

        console.error(error);
        res.status(500).json({ message: 'Server error while creating user' });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;

        let passwordProvided = false;
        if (updatedUser.password && updatedUser.password.trim() !== '') {
            passwordProvided = true;
        }

        await User.update(id, updatedUser, passwordProvided);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating user' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        await User.delete(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting user' });
    }
}


export { getAllUsers, getUserById, getUpdateFormFields, createUser, updateUser, deleteUser };
