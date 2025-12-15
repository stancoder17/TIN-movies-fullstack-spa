import db from '../db.js';

class Rating {
    static async getAll() {
        const sql = 'SELECT * FROM ratings';

        const [rows] = await db.execute(sql);
        return rows;
    }

    static async getById(id) {
        const sql = 'SELECT * FROM ratings WHERE id = ?';
        const params = [id];

        const [rows] = await db.execute(sql, params);
        return rows[0];
    }

    static async create(rating) {
        const sql = 'INSERT INTO ratings (user_id, movie_id, score, comment) VALUES (?, ?, ?, ?, ?)';
        const params = [
            rating.user_id,
            rating.movie_id,
            rating.score,
            rating.comment
        ];

        const [result] = await db.execute(sql, params);

        // Return created rating
        return { id: result.insertId, ...rating };
    }

    static async update(id, rating) {
        const sql = 'UPDATE ratings SET score = ?, comment = ? WHERE id = ?';
        const params = [
            rating.score,
            rating.comment,
            id
        ];

        await db.execute(sql, params);

        // Return updated rating
        return { id: id, ...rating};
    }

    static async delete(id) {
        const sql = 'DELETE FROM ratings WHERE id = ?';
        const params = [id];

        await db.execute(sql, params);
    }

    static async getByMovieId(movieId) {
        const sql = 'SELECT * FROM ratings WHERE movie_id = ?';
        const params = [movieId];

        const [rows] = await db.execute(sql, params);
        return rows;
    }

    static async getByUserId(userId) {
        const sql = 'SELECT * FROM ratings WHERE user_id = ?';
        const params = [userId];

        const [rows] = await db.execute(sql, params);
        return rows;
    }

    static async getByUserAndMovie(userId, movieId) {
        const sql = 'SELECT * FROM ratings WHERE user_id = ? AND movie_id = ?';
        const params = [userId, movieId];

        const [rows] = await db.execute(sql, params);
        return rows[0];
    }

    static async getMovieRatingsWithDetails(movieId) {
        const sql = `
            SELECT 
                r.id,
                r.user_id,
                r.movie_id,
                r.score,
                r.comment,
                r.created_at,
                u.nickname,
                u.profile_picture_url
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.movie_id = ?
            ORDER BY r.created_at DESC
        `;
        const params = [movieId];

        const [rows] = await db.execute(sql, params);
        return rows;
    }

    static async getUserRatingsWithDetails(userId) {
        const sql = `
            SELECT 
                r.id,
                r.user_id,
                r.movie_id,
                r.score,
                r.comment,
                r.created_at,
                m.title,
                m.poster_url
            FROM ratings r
            JOIN movies m ON r.movie_id = m.id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC
        `;
        const params = [userId];

        const [rows] = await db.execute(sql, params);
        return rows;
    }
}

export default Rating;

