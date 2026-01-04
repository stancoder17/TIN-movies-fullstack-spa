import db from '../config/database/db.js';
import crypto from 'crypto';
import userConstraints from '../../utils/constraints/userConstraints.js';
import serverUserConstraints from '../config/constraints/userConstraints.js';
import paginationConstraints from '../../utils/constraints/paginationConstraints.js';

class User {
    static defaultLimit = paginationConstraints.defaultLimit;
    static defaultOffset = 0;

    static hashPassword(password) {
        return crypto.createHash('sha256')
            .update(password)
            .digest('hex');
    }

    static validatePasswordHash(passwordHash) {
        if (passwordHash.length !== serverUserConstraints.passwordHash.length) {
            throw new Error('Password hashing error: invalid hash length');
        }

        if (!serverUserConstraints.passwordHash.pattern.test(passwordHash.toLowerCase())) {
            throw new Error('Password hashing error: invalid hash format');
        }
    }

    static async getAll(limit = this.defaultLimit, offset = this.defaultOffset) {
        let sql = 'SELECT * FROM users';
        const params = [];

         // Create count query before adding LIMIT and OFFSET
        const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as count');

        // Paging
        sql += ' LIMIT ? OFFSET ?';
        params.push(limit);
        params.push(offset);

        const users = await db.all(sql, params);
        const countResult = await db.get(countSql);

        return {
            users: users,
            totalCount: countResult.count
        };
    }

    static async getById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const params = [id];

        return await db.get(sql, params);
    }

    static async getUpdateFormFields() {
        return [
            {type: 'text', label: 'Nickname', name: 'nickname', required: userConstraints.nickname.required, minLength: userConstraints.nickname.minLength, maxLength: userConstraints.nickname.maxLength },
            {type: 'email', label: 'Email', name: 'email', required: userConstraints.email.required, minLength: userConstraints.email.minLength, maxLength: userConstraints.email.maxLength, pattern: userConstraints.email.pattern.source},
            {type: 'password', label: 'Password', name: 'password', placeholder: '(optional)', required: false, minLength: userConstraints.password.minLength, maxLength: userConstraints.password.maxLength},
            {type: 'url', label: 'Profile picture URL', name: 'profile_picture_url', required: userConstraints.profilePictureUrl.required, minLength: userConstraints.profilePictureUrl.minLength, maxLength: userConstraints.profilePictureUrl.maxLength, pattern: userConstraints.profilePictureUrl.pattern.source},
            {type: 'date', label: 'Date of birth', name: 'date_of_birth', required: userConstraints.dateOfBirth.required, min: userConstraints.dateOfBirth.earliest},
            {type: 'textarea', label: 'Bio', name: 'bio', placeholder: 'About me...', required: userConstraints.bio.required, minLength: userConstraints.bio.minLength, maxLength: userConstraints.bio.maxLength}
        ];
    }

    static async getRegisterFormFields() {
        return [
            {type: 'text', label: 'Nickname', name: 'nickname', required: userConstraints.nickname.required, minLength: userConstraints.nickname.minLength, maxLength: userConstraints.nickname.maxLength},
            {type: 'date', label: 'Date of birth', name: 'date_of_birth', required: userConstraints.dateOfBirth.required, min: userConstraints.dateOfBirth.earliest},
            {type: 'email', label: 'Email', name: 'email', required: userConstraints.email.required, minLength: userConstraints.email.minLength, maxLength: userConstraints.email.maxLength, pattern: userConstraints.email.pattern.source},
            {type: 'password', label: 'Password', name: 'password', required: userConstraints.password.required, minLength: userConstraints.password.minLength, maxLength: userConstraints.password.maxLength},
            {type: 'password', label: 'Confirm password', name: 'confirm_password', required: userConstraints.password.required, minLength: userConstraints.password.minLength, maxLength: userConstraints.password.maxLength}
        ];
    }

    static async create(userData) {
        const passwordHash = this.hashPassword(userData.password);
        this.validatePasswordHash(passwordHash);

        const sql = 'INSERT INTO users (nickname, email, password_hash, date_of_birth) VALUES (?, ?, ?, ?)';
        const params = [
            userData.nickname,
            userData.email,
            passwordHash,
            userData.date_of_birth,
        ];
        await db.run(sql, params);
    }

    static async update(id, userData, passwordProvided) {
        let sql = 'UPDATE users SET nickname = ?, email = ?, profile_picture_url = ?, date_of_birth = ?, bio = ?';
        const params = [
            userData.nickname,
            userData.email,
            userData.profile_picture_url,
            userData.date_of_birth,
            userData.bio
        ];

        // Password doesn't have to be provided by User. If it is -> expand the query.
        if (passwordProvided) {
            const passwordHash = this.hashPassword(userData.password);
            this.validatePasswordHash(passwordHash);
            sql += ', password_hash = ?';
            params.push(passwordHash);
        }

        sql += ' WHERE id = ?';
        params.push(id);

        await db.run(sql, params);
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

