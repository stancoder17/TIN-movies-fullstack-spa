import db from '../config/database/db.js';

class Movie {
    static async getAll() {
        const sql = 'SELECT * FROM movies';

        const rows = await db.all(sql);
        return rows;
    }

    static async getById(id) {
        const sql = 'SELECT * FROM movies WHERE id = ?';
        const params = [id];

        const row = await db.get(sql, params);
        return row;
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

        const result = await db.run(sql, params);

        // Return created movie
        return Movie.getById(result.lastId);
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

        const result = await db.run(sql, params);

        // Return updated movie
        return Movie.getById(result.lastID);
    }

    static async delete(id) {
        const sql = 'DELETE FROM movies WHERE id = ?';
        const params = [id];

        await db.run(sql, params);
    }
}

export default Movie;
