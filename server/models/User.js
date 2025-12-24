import db from '../config/database/db.js';
import crypto from 'crypto';
import userConstraints from '../config/constraints/userConstraints.js';

class User {
    static hashPassword(password) {
        return crypto.createHash('sha256')
            .update(password)
            .digest('hex');
    }

    static validatePasswordHash(passwordHash) {
        if (passwordHash.length !== userConstraints.passwordHash.length) {
            throw new Error('Password hashing error: invalid hash length');
        }

        if (!userConstraints.passwordHash.pattern.test(passwordHash.toLowerCase())) {
            throw new Error('Password hashing error: invalid hash format');
        }
    }

    static async getAll() {
        const sql = 'SELECT * FROM users';

        return await db.all(sql);
    }

    static async getById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const params = [id];

        return await db.get(sql, params);
    }

    static async create(userData) {
        const passwordHash = this.hashPassword(userData.password);
        this.validatePasswordHash(passwordHash);

        const sql = 'INSERT INTO users (nickname, email, password_hash, profile_picture_url, date_of_birth, bio) VALUES (?, ?, ?, ?, ?, ?)';
        const params = [
            userData.nickname,
            userData.email,
            passwordHash,
            userData.profile_picture_url,
            userData.date_of_birth,
            userData.bio
        ];
        const result = await db.run(sql, params);

        return await User.getById(result.lastID);
    }

    static async update(id, userData) {
        const passwordHash = this.hashPassword(userData.password);
        this.validatePasswordHash(passwordHash);

        const sql = 'UPDATE users SET nickname = ?, email = ?, password_hash = ?, profile_picture_url = ?, date_of_birth = ?, bio = ? WHERE id = ?';
        const params = [
            userData.nickname,
            userData.email,
            passwordHash,
            userData.profile_picture_url,
            userData.date_of_birth,
            userData.bio,
            id
        ];
        await db.run(sql, params);

        return await User.getById(id);
    }

    static async delete(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const params = [id];

        await db.run(sql, params);
    }

    // For authentication purposes
    static async getByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const params = [email];

        return await db.get(sql, params);
    }
}

export default User;

