import User from '../models/User.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = req.resource;
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching user' });
    }
}

const createUser = async (req, res) => {
    try {
        const result = await User.create(req.body);
        res.status(201).json(result);
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
        const result = await User.update(id, updatedUser);
        res.status(200).json(result);
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


export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
