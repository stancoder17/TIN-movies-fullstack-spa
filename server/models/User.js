import db from '../db.js';

class User {
    static async getAll() {
        const sql = 'SELECT * FROM users';

        const [rows] = await db.execute(sql);
        return rows;
    }

    static async getById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const params = [id];

        const [rows] = await db.execute(sql, params);
        return rows[0];
    }

    static async create(user) {
        const sql = 'INSERT INTO users (nickname, email, password_hash, profile_picture, date_of_birth, date_of_joining, bio) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const params = [
            user.nickname,
            user.email,
            user.password_hash,
            user.profile_picture,
            user.date_of_birth,
            user.date_of_joining,
            user.bio
        ];

        const [result] = await db.execute(sql, params);

        // Return created user
        return { id: result.insertId, ...user };
    }

    static async update(id, user) {
        const sql = 'UPDATE users SET nickname = ?, email = ?, password_hash = ?, profile_picture = ?, date_of_birth = ?, date_of_joining = ?, bio = ? WHERE id = ?';
        const params = [
            user.nickname,
            user.email,
            user.password_hash,
            user.profile_picture,
            user.date_of_birth,
            user.date_of_joining,
            user.bio,
            id
        ];

        await db.execute(sql, params);

        // Return updated user
        return { id, ...user };
    }

    static async delete(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const params = [id];

        await db.execute(sql, params);
    }

    // For authentication purposes
    static async getByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const params = [email];

        const [rows] = await db.execute(sql, params);
        return rows[0];
    }
}

export default User;

