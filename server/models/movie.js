import db from '../db.js';

class Movie {
    static async getAll() {
        const sql = 'SELECT * FROM movies';

        const [rows] = await db.execute(sql);
        return rows;
    }

    static async getById(id) {
        const sql = 'SELECT * FROM movies WHERE id = ?';
        const params = [id];

        const [rows] = await db.execute(sql, params);
        return rows[0];
    }

    static async create(movie) {
        const sql = 'INSERT INTO movies (title, description, genre, director, release_date, runtime, poster_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const params = [
            movie.title,
            movie.description,
            movie.genre,
            movie.director,
            movie.release_date,
            movie.runtime,
            movie.poster_url
        ];

        const [result] = await db.execute(sql, params);

        // Return created movie
        // insertId is an id (auto-incremented) of the newly created movie
        return { id: result.insertId, ...movie };
    }

    static async update(id, movie) {
        const sql = 'UPDATE movies SET title = ?, description = ?, genre = ?, director = ?, release_date = ?, runtime = ?, poster_url = ? WHERE id = ?';
        const params = [
            movie.title,
            movie.description,
            movie.genre,
            movie.director,
            movie.release_date,
            movie.runtime,
            movie.poster_url,
            id
        ];

        await db.execute(sql, params);

        // Return updated movie
        return { id, ...movie };
    }

    static async delete(id) {
        const sql = 'DELETE FROM movies WHERE id = ?';
        const params = [id];

        await db.execute(sql, params);
    }
}

export default Movie;